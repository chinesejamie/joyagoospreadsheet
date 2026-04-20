#!/bin/bash

# ====== CONFIG ======
SSH_KEY="/Users/jamie/Desktop/All Websites/RootKey"
SERVER_IP="217.154.115.9"
REMOTE_DIR="/var/www/joyagoonext3027"
PM2_PROCESS_NAME="JoyaGoo3027"
PORT="3027"
DOMAIN="joyagoospreadsheet.com"
# =====================

# Check if SSH key exists
if [ ! -f "$SSH_KEY" ]; then
  echo "Error: SSH key not found at $SSH_KEY"
  exit 1
fi

echo "Starting Deployment..."

# Step 1: Compress project
echo "Compressing project..."
tar --exclude='.next' \
    --exclude='node_modules' \
    --exclude='.turbo' \
    --exclude='.git' \
    --exclude='out' \
    --exclude='*.pem' \
    --exclude='*.key' \
    --exclude='*.pub' \
    --exclude='kRoot' \
    --exclude='.env' \
    --exclude='project.tar.gz' \
    -czf project.tar.gz .

# Step 2: Upload archive
echo "Uploading project..."
scp -i "$SSH_KEY" project.tar.gz root@"$SERVER_IP":/tmp/project.tar.gz

# Step 3: Deploy on server
echo "Deploying on server..."
ssh -t -i "$SSH_KEY" root@"$SERVER_IP" << 'EOF'
  set -e

  REMOTE_DIR="/var/www/joyagoonext3027"
  PM2_PROCESS_NAME="JoyaGoo3027"
  DOMAIN="joyagoospreadsheet.com"

  # Create directory
  mkdir -p $REMOTE_DIR

  # Clean old files (keep .env)
  find $REMOTE_DIR -mindepth 1 ! -name '.env' -exec rm -rf {} + 2>/dev/null || true

  # Extract new code
  tar -xzf /tmp/project.tar.gz -C $REMOTE_DIR
  rm /tmp/project.tar.gz

  cd $REMOTE_DIR

  # Install dependencies
  echo "Installing dependencies..."
  npm install

  # Build project
  echo "Building project..."
  npm run build

  # Configure Nginx
  echo "Configuring Nginx..."
  cat > /etc/nginx/sites-available/$DOMAIN << 'NGINX_CONFIG'
server {
    listen 80;
    server_name joyagoospreadsheet.com www.joyagoospreadsheet.com;

    location / {
        proxy_pass http://localhost:3027/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    access_log /var/log/nginx/joyagoo_access.log;
    error_log /var/log/nginx/joyagoo_error.log;
}
NGINX_CONFIG

  # Enable site
  ln -sf /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/$DOMAIN

  # Test and restart Nginx
  nginx -t && systemctl restart nginx

  # PM2 setup
  echo "Setting up PM2..."
  pm2 delete $PM2_PROCESS_NAME 2>/dev/null || true

  # Create ecosystem config
  cat > ecosystem.config.js << 'PM2_CONFIG'
module.exports = {
  apps: [{
    name: 'JoyaGoo3027',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/joyagoonext3027',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3027
    }
  }]
};
PM2_CONFIG

  pm2 start ecosystem.config.js
  pm2 save

  echo "PM2 Status:"
  pm2 list
EOF

# Cleanup
rm project.tar.gz

echo "Deployment complete!"
echo "Site: https://joyagoospreadsheet.com"
