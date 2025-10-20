#!/bin/bash

# ====== CONFIG ======
SSH_KEY="keyChina.pem"                    # Your SSH private key
SERVER_IP="212.227.74.41"                 # Your Server IP
REMOTE_DIR="/var/www/kakobuy"             # Target directory on server
LOCAL_PROJECT_DIR="./"                    # Your local project folder
PM2_PROCESS_NAME="kakobuy3014"            # PM2 Process name (better than ID)
PORT="3014"                               # Port for the application
# =====================

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if SSH key exists
if [ ! -f "$SSH_KEY" ]; then
  echo -e "${RED}Error: SSH key not found at $SSH_KEY${NC}"
  exit 1
fi

# Check if package.json exists
if [ ! -f "$LOCAL_PROJECT_DIR/package.json" ]; then
  echo -e "${RED}Error: package.json not found in $LOCAL_PROJECT_DIR${NC}"
  exit 1
fi

echo "🚀 Starting Nuxt 3 Deployment to port $PORT..."

# Step 1: Compress the project excluding unnecessary files
echo "🗜️  Compressing project (excluding build artifacts and dependencies)..."
tar --exclude='.output' \
    --exclude='node_modules' \
    --exclude='.nuxt' \
    --exclude='dist' \
    --exclude='.git' \
    --exclude='.github' \
    --exclude='.vscode' \
    --exclude='*.log' \
    --exclude='*.tar.gz' \
    --exclude='.DS_Store' \
    -czf nuxt-project.tar.gz -C "$LOCAL_PROJECT_DIR" .

# Check if compression was successful
if [ ! -f "nuxt-project.tar.gz" ]; then
  echo -e "${RED}Error: Failed to create project archive${NC}"
  exit 1
fi

echo "📦 Archive created: $(du -h nuxt-project.tar.gz | cut -f1)"

# Step 2: Upload archive to server
echo "📤 Uploading project archive to server..."
scp -i "$SSH_KEY" nuxt-project.tar.gz root@"$SERVER_IP":/tmp/nuxt-project.tar.gz

if [ $? -ne 0 ]; then
  echo -e "${RED}Error: Failed to upload archive to server${NC}"
  rm nuxt-project.tar.gz
  exit 1
fi

# Step 3: Connect to server and deploy
echo "🔧 Deploying on server..."
ssh -i "$SSH_KEY" root@"$SERVER_IP" << 'ENDSSH'
set -e  # Exit on any error

echo "========================================="
echo "Starting deployment on server"
echo "========================================="

# Update Node.js to the latest LTS version
echo "🔧 Checking Node.js version..."
CURRENT_NODE=$(node -v 2>/dev/null | sed 's/v//' || echo "0.0.0")
REQUIRED_NODE="20.19.0"

# Function to compare versions
version_ge() {
    # Returns 0 if $1 >= $2
    [ "$(printf '%s\n' "$2" "$1" | sort -V | head -n1)" = "$2" ]
}

if ! version_ge "$CURRENT_NODE" "$REQUIRED_NODE"; then
    echo "📦 Current Node.js version ($CURRENT_NODE) is outdated."
    echo "📦 Updating Node.js to latest v20 LTS..."
    
    # Remove old Node.js repository if exists
    rm -f /etc/apt/sources.list.d/nodesource.list*
    
    # Install latest Node.js 20 LTS
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt-get update
    apt-get install -y nodejs
    
    # Verify installation
    echo "✅ Node.js updated to: $(node -v)"
    echo "✅ npm updated to: $(npm -v)"
else
    echo "✅ Node.js version is sufficient: v$CURRENT_NODE"
fi

# Install PM2 if not present
if ! command -v pm2 &> /dev/null; then
    echo "📦 Installing PM2..."
    npm install -g pm2@latest
else
    echo "📦 Updating PM2..."
    npm install -g pm2@latest
fi

ENDSSH

# Continue with the rest of deployment
ssh -i "$SSH_KEY" root@"$SERVER_IP" << ENDSSH
set -e  # Exit on any error

# Variables
REMOTE_DIR="$REMOTE_DIR"
PM2_PROCESS_NAME="$PM2_PROCESS_NAME"
PORT="$PORT"

# Prepare directory
echo "📂 Preparing remote directory..."
mkdir -p \$REMOTE_DIR

# Backup .env file if it exists
if [ -f "\$REMOTE_DIR/.env" ]; then
    echo "💾 Backing up .env file..."
    cp \$REMOTE_DIR/.env /tmp/.env.backup
fi

# Clean old files (preserve .env)
echo "🧹 Cleaning old project files..."
cd \$REMOTE_DIR
find . -mindepth 1 ! -name '.env' -exec rm -rf {} + 2>/dev/null || true

# Extract new code
echo "📦 Extracting new project files..."
tar -xzf /tmp/nuxt-project.tar.gz -C \$REMOTE_DIR
rm /tmp/nuxt-project.tar.gz

# Restore .env if it was backed up
if [ -f "/tmp/.env.backup" ]; then
    echo "♻️  Restoring .env file..."
    mv /tmp/.env.backup \$REMOTE_DIR/.env
fi

# Move to project directory
cd \$REMOTE_DIR

# Clean install dependencies
echo "📦 Clean installing dependencies..."
rm -rf node_modules package-lock.json

# Install with npm
echo "Installing with npm..."
npm install

# Build the Nuxt project
echo "🛠️  Building Nuxt 3 project..."
npm run build

# Verify build output
if [ ! -d ".output/server" ]; then
    echo "❌ Build failed - no .output/server directory found"
    echo "Build output:"
    ls -la .output/ 2>/dev/null || echo "No .output directory"
    exit 1
fi

echo "✅ Build successful!"

# Navigate to server directory
cd \$REMOTE_DIR/.output/server

# Check for entry file
ENTRY_FILE="index.mjs"
if [ ! -f "\$ENTRY_FILE" ]; then
    echo "⚠️  Warning: index.mjs not found, looking for alternative..."
    ENTRY_FILE=\$(ls *.mjs 2>/dev/null | head -1)
    if [ -z "\$ENTRY_FILE" ]; then
        echo "❌ No entry file found!"
        exit 1
    fi
fi

# PM2 Management
echo "🔄 Managing PM2 process..."

# Delete old process if exists
pm2 delete "\$PM2_PROCESS_NAME" 2>/dev/null || true

# Start new process
echo "Starting new PM2 process: \$PM2_PROCESS_NAME on port \$PORT"
cd \$REMOTE_DIR/.output/server
PORT=\$PORT NITRO_PORT=\$PORT HOST=0.0.0.0 NODE_ENV=production \
    pm2 start \$ENTRY_FILE \
    --name "\$PM2_PROCESS_NAME" \
    --interpreter node \
    --env "PORT=\$PORT" \
    --env "NITRO_PORT=\$PORT" \
    --env "HOST=0.0.0.0" \
    --env "NODE_ENV=production" \
    --merge-logs \
    --log-date-format="YYYY-MM-DD HH:mm:ss Z"

# Save PM2 configuration
pm2 save

# Setup startup (only needs to run once)
pm2 startup systemd -u root --hp /root 2>/dev/null || true

# Wait for application to start
echo "⏳ Waiting for application to start..."
sleep 5

# Show status
echo ""
echo "========================================="
echo "Deployment Status:"
echo "========================================="
pm2 list

# Check port
if netstat -tuln | grep -q ":\$PORT "; then
    echo ""
    echo "✅ SUCCESS! Application is running on port \$PORT"
    echo "🌐 URL: http://$SERVER_IP:\$PORT"
else
    echo ""
    echo "⚠️  Port \$PORT is not listening. Checking logs..."
    pm2 logs "\$PM2_PROCESS_NAME" --lines 30 --nostream
fi

echo "========================================="

ENDSSH

# Step 4: Clean up local archive
echo "🧹 Removing local archive..."
rm nuxt-project.tar.gz

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✅ Deployment complete!${NC}"
    echo -e "${GREEN}🌐 Application: http://$SERVER_IP:$PORT${NC}"
    echo ""
    echo "📝 Useful commands:"
    echo "  Status:  ssh -i $SSH_KEY root@$SERVER_IP 'pm2 list'"
    echo "  Logs:    ssh -i $SSH_KEY root@$SERVER_IP 'pm2 logs $PM2_PROCESS_NAME'"
    echo "  Monitor: ssh -i $SSH_KEY root@$SERVER_IP 'pm2 monit'"
    echo "  Restart: ssh -i $SSH_KEY root@$SERVER_IP 'pm2 restart $PM2_PROCESS_NAME'"
else
    echo -e "${RED}❌ Deployment failed! Check errors above.${NC}"
fi

# Pause
echo ""
read -p "Press [Enter] to close the terminal..."