#!/bin/bash
# Deploy joyagoospreadsheet.com: build LOCALLY (the VPS has no RAM headroom for
# `next build`), upload .next + public + sources via tar-over-ssh (macOS rsync is
# broken against this host), swap directories, restart pm2. Keeps the server .env.
set -euo pipefail

SSH_KEY="/Users/asiger/Desktop/All Websites/RootKey"
SERVER="root@217.154.115.9"
REMOTE_DIR="/var/www/joyagoonext3027"
PM2_NAME="JoyaGoo3027"
DOMAIN="joyagoospreadsheet.com"

cd "$(dirname "$0")"
[ -f "$SSH_KEY" ] || { echo "SSH key missing: $SSH_KEY"; exit 1; }

if [ "${SKIP_BUILD:-0}" != "1" ]; then
  echo "== Building locally (webpack, .env.local must point MONGODB_URI at the SSH tunnel)…"
  rm -rf .next
  npx next build
fi
[ -f .next/BUILD_ID ] || { echo "no .next/BUILD_ID – build failed?"; exit 1; }
rm -rf .next/cache

echo "== Packing…"
export COPYFILE_DISABLE=1
tar --no-xattrs -czf /tmp/joyagoo-deploy.tgz \
  --exclude='node_modules' --exclude='.git' --exclude='.env*' --exclude='*.tgz' \
  .next public app components lib models package.json package-lock.json next.config.mjs tsconfig.json postcss.config.mjs jsconfig.json next-env.d.ts

echo "== Uploading…"
scp -q -i "$SSH_KEY" /tmp/joyagoo-deploy.tgz "$SERVER":/tmp/joyagoo-deploy.tgz
LOCAL_PKG_HASH=$(shasum -a 256 package.json | cut -c1-16)

echo "== Installing on server…"
ssh -i "$SSH_KEY" "$SERVER" REMOTE_DIR="$REMOTE_DIR" PM2_NAME="$PM2_NAME" LOCAL_PKG_HASH="$LOCAL_PKG_HASH" 'bash -s' <<'REMOTE'
set -euo pipefail
NEW="${REMOTE_DIR}.new"; OLD="${REMOTE_DIR}.old"
rm -rf "$NEW" && mkdir -p "$NEW"
tar -xzf /tmp/joyagoo-deploy.tgz -C "$NEW" && rm /tmp/joyagoo-deploy.tgz
cp "$REMOTE_DIR/.env" "$NEW/.env"
# reuse node_modules when package.json is unchanged
if [ -d "$REMOTE_DIR/node_modules" ] && [ "$(sha256sum "$REMOTE_DIR/package.json" | cut -c1-16)" = "$LOCAL_PKG_HASH" ]; then
  mv "$REMOTE_DIR/node_modules" "$NEW/node_modules"
else
  (cd "$NEW" && npm ci --omit=dev --no-audit --no-fund)
fi
rm -rf "$OLD"; mv "$REMOTE_DIR" "$OLD"; mv "$NEW" "$REMOTE_DIR"
cat > "$REMOTE_DIR/ecosystem.config.js" <<PM2
module.exports = { apps: [{ name: '${PM2_NAME}', script: 'npm', args: 'start', cwd: '${REMOTE_DIR}', instances: 1, autorestart: true, watch: false, max_memory_restart: '1G', env: { NODE_ENV: 'production', PORT: 3027 } }] };
PM2
pm2 delete "$PM2_NAME" >/dev/null 2>&1 || true
pm2 start "$REMOTE_DIR/ecosystem.config.js" >/dev/null && pm2 save >/dev/null
sleep 4
curl -s -o /dev/null -w "local http %{http_code}\n" -H "Host: joyagoospreadsheet.com" http://127.0.0.1:3027/
rm -rf "$OLD"
REMOTE
rm -f /tmp/joyagoo-deploy.tgz

echo "== Verifying from outside…"
curl -s -o /dev/null -w "https://$DOMAIN/ -> %{http_code}\n" "https://$DOMAIN/"
curl -s -A "Mozilla/5.0 (compatible; Googlebot/2.1)" "https://$DOMAIN/" | grep -ci kakobuy | sed 's/^/kakobuy mentions (must be 0): /'
echo "Deployment complete."
