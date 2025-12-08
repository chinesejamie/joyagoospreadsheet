# KakoBuy Spreadsheet - Deployment Guide

## Quick Start

Deploy your KakoBuy Spreadsheet application to production in minutes:

```bash
./deploy_kakobuy.sh
```

---

## Prerequisites

Before running the deployment script, ensure you have:

### Required:
- ✅ SSH key at `/Users/asiger/Desktop/RootKey` with proper permissions (chmod 600)
- ✅ Server access: `root@217.154.115.9`
- ✅ Git repository: https://github.com/chinesejamie/kakobuynext.git
- ✅ Node.js and npm installed locally (for building)

### Recommended:
- 🔵 DNS A record pointing `kakobuy-spreadsheet.com` to `217.154.115.9`
- 🔵 DNS A record pointing `www.kakobuy-spreadsheet.com` to `217.154.115.9`
- 🔵 Backup of current production (if updating)

---

## Deployment Script Overview

The `deploy_kakobuy.sh` script performs these steps automatically:

1. **Validates SSH connection** to the server
2. **Commits and pushes** local changes to Git
3. **Builds the application** locally with `npm run build`
4. **Uploads files** to the server via rsync
5. **Installs dependencies** on the server
6. **Configures environment** variables
7. **Sets up PM2** process manager
8. **Configures Nginx** reverse proxy
9. **Obtains SSL certificate** from Let's Encrypt
10. **Configures firewall** (UFW)
11. **Starts the application** on port 3014

---

## Configuration

### Server Details:
```bash
Server IP:    217.154.115.9
Domain:       kakobuy-spreadsheet.com
Port:         3014 (internal)
Remote Dir:   /var/www/kakobuy-spreadsheet.com
App Name:     kakobuyspreadsheet
```

### Environment Variables:
The script automatically creates a `.env` file on the server with:
```env
MONGODB_URI=mongodb://envUser:OnlyReadAndWritedug1u@217.154.115.9:27017/myChinaFinds?authSource=myChinaFinds
PORT=3014
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...
NEXT_PUBLIC_APP_URL=https://kakobuy-spreadsheet.com
NEXT_PUBLIC_INVITE_URL=https://www.kakobuy.com/register_sps?affcode=kakobuyspreadsheet
AGENT_NAME=KakoBuy
INVITE_URL=https://ikako.vip/r/kakobuyspreadsheet
```

---

## Step-by-Step Deployment

### 1. Prepare Local Environment
```bash
cd "/Users/asiger/Desktop/KakoBuy Next Current "

# Ensure all changes are saved
git status

# Make script executable (if not already)
chmod +x deploy_kakobuy.sh
```

### 2. Run Deployment Script
```bash
./deploy_kakobuy.sh
```

### 3. Monitor Deployment
The script will show progress for each step:
- 🔑 SSH validation
- 🔄 Git commit/push
- 📦 Local build
- 📤 File upload
- 🔧 Server setup
- 🚀 Application start
- 🔒 SSL configuration

### 4. Verify Deployment
After deployment completes, verify:

```bash
# Check application status
ssh -i /Users/asiger/Desktop/RootKey root@217.154.115.9 'pm2 status'

# View real-time logs
ssh -i /Users/asiger/Desktop/RootKey root@217.154.115.9 'pm2 logs kakobuyspreadsheet'

# Test the website
curl -I https://kakobuy-spreadsheet.com

# Check SSL certificate
curl -vI https://kakobuy-spreadsheet.com 2>&1 | grep -A 5 'SSL connection'
```

---

## Post-Deployment Tasks

### Immediate (< 5 minutes):
1. ✅ Test homepage: https://kakobuy-spreadsheet.com
2. ✅ Check product listing: https://kakobuy-spreadsheet.com/kakobuy-spreadsheet
3. ✅ Verify MongoDB connection (check logs)
4. ✅ Test a product detail page
5. ✅ Verify Google Analytics/GTM tracking

### Within 1 Hour:
1. 🔵 Monitor PM2 logs for errors
2. 🔵 Check Nginx access logs for traffic
3. 🔵 Verify SSL certificate is active
4. 🔵 Test from different browsers/devices
5. 🔵 Check mobile responsiveness

### Within 24 Hours:
1. 🔵 Monitor server resource usage (CPU, RAM, disk)
2. 🔵 Review application performance
3. 🔵 Check for any 404 errors in logs
4. 🔵 Verify database queries are efficient
5. 🔵 Test all major features (search, filters, etc.)

---

## Common Issues & Solutions

### Issue: SSH Connection Failed
**Solution:**
```bash
# Check SSH key permissions
chmod 600 /Users/asiger/Desktop/RootKey

# Test SSH manually
ssh -i /Users/asiger/Desktop/RootKey root@217.154.115.9

# If still failing, check server firewall
# Server should allow port 22 (SSH)
```

### Issue: Git Push Failed
**Solution:**
```bash
# Check Git credentials
git config user.name
git config user.email

# Pull latest changes first
git pull origin main

# Force push (use with caution)
git push -f origin main
```

### Issue: Build Failed
**Solution:**
```bash
# Clean build cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Try build again
npm run build
```

### Issue: PM2 Won't Start
**Solution:**
```bash
# SSH into server
ssh -i /Users/asiger/Desktop/RootKey root@217.154.115.9

# Check Node.js is installed
node --version
npm --version

# Manually start PM2
cd /var/www/kakobuy-spreadsheet.com
pm2 start ecosystem.config.js

# Check logs
pm2 logs kakobuyspreadsheet
```

### Issue: Nginx Configuration Error
**Solution:**
```bash
# SSH into server
ssh -i /Users/asiger/Desktop/RootKey root@217.154.115.9

# Test Nginx config
nginx -t

# Check Nginx error logs
tail -f /var/log/nginx/kakobuy-spreadsheet.com.error.log

# Reload Nginx
systemctl reload nginx
```

### Issue: SSL Certificate Failed
**Solution:**
```bash
# Ensure DNS is pointing to server
nslookup kakobuy-spreadsheet.com
# Should return: 217.154.115.9

# Manually obtain certificate
ssh -i /Users/asiger/Desktop/RootKey root@217.154.115.9
certbot --nginx -d kakobuy-spreadsheet.com -d www.kakobuy-spreadsheet.com
```

### Issue: Application Shows Errors
**Solution:**
```bash
# Check PM2 logs
ssh -i /Users/asiger/Desktop/RootKey root@217.154.115.9 'pm2 logs kakobuyspreadsheet --lines 100'

# Check MongoDB connection
# Verify MONGODB_URI in .env is correct

# Restart application
ssh -i /Users/asiger/Desktop/RootKey root@217.154.115.9 'pm2 restart kakobuyspreadsheet'
```

---

## Useful Commands

### Local Commands:
```bash
# Build locally
npm run build

# Test locally
npm run dev

# Check for security issues
npm audit

# Update dependencies
npm update
```

### Remote Server Commands:
```bash
# SSH into server
ssh -i /Users/asiger/Desktop/RootKey root@217.154.115.9

# PM2 Commands
pm2 status                      # Check all processes
pm2 logs kakobuyspreadsheet     # View logs (live)
pm2 restart kakobuyspreadsheet  # Restart app
pm2 stop kakobuyspreadsheet     # Stop app
pm2 start kakobuyspreadsheet    # Start app
pm2 delete kakobuyspreadsheet   # Remove from PM2
pm2 save                        # Save current process list
pm2 monit                       # Real-time monitoring

# Nginx Commands
systemctl status nginx          # Check Nginx status
systemctl restart nginx         # Restart Nginx
systemctl reload nginx          # Reload config
nginx -t                        # Test configuration
tail -f /var/log/nginx/kakobuy-spreadsheet.com.access.log  # Access logs
tail -f /var/log/nginx/kakobuy-spreadsheet.com.error.log   # Error logs

# Firewall Commands
ufw status                      # Check firewall status
ufw status verbose              # Detailed status
ufw allow 80/tcp                # Allow HTTP
ufw allow 443/tcp               # Allow HTTPS
ufw allow 22/tcp                # Allow SSH

# SSL Certificate Commands
certbot renew                   # Renew certificates
certbot certificates            # List certificates
systemctl status certbot.timer  # Check auto-renewal status

# System Monitoring
htop                           # CPU/Memory monitoring
df -h                          # Disk usage
free -h                        # Memory usage
netstat -tulpn                 # Check open ports
```

---

## Updating the Application

### For Minor Updates (no dependencies changed):
```bash
# Make your code changes
# Then run deployment script
./deploy_kakobuy.sh
```

### For Major Updates (dependencies changed):
```bash
# Update package.json locally
npm install

# Test locally
npm run dev

# Run security audit
npm audit

# Deploy
./deploy_kakobuy.sh
```

---

## Rollback Procedure

If deployment fails or causes issues:

```bash
# SSH into server
ssh -i /Users/asiger/Desktop/RootKey root@217.154.115.9

# Check PM2 logs for errors
pm2 logs kakobuyspreadsheet --lines 100

# Option 1: Restart current deployment
pm2 restart kakobuyspreadsheet

# Option 2: Restore from Git (if committed)
cd /var/www/kakobuy-spreadsheet.com
git pull origin main
npm install --production
pm2 restart kakobuyspreadsheet

# Option 3: Full rollback
# Restore from backup (if available)
# Or redeploy previous version from Git
```

---

## Maintenance Schedule

### Daily:
- Monitor PM2 logs for errors
- Check application uptime
- Review user-reported issues

### Weekly:
- Review Nginx logs
- Check MongoDB performance
- Monitor disk space usage
- Review error rates

### Monthly:
- Run `npm audit` for security updates
- Update dependencies if needed
- Review SSL certificate expiry (auto-renewed)
- Check backup integrity
- Review server resource usage

### Quarterly:
- Full security audit
- Performance optimization review
- Database cleanup/optimization
- Disaster recovery test

---

## Security Checklist

Before deploying to production:

- ✅ All npm packages updated to secure versions
- ✅ `npm audit` shows 0 vulnerabilities
- ✅ .env file excluded from Git
- ✅ MongoDB uses authentication
- ✅ Firewall configured (ports 22, 80, 443 only)
- ✅ SSL certificate configured
- ✅ Security headers in Nginx
- ✅ PM2 process isolation
- ✅ No sensitive data in logs
- ✅ Error handling implemented

---

## Support & Resources

### Documentation:
- Next.js: https://nextjs.org/docs
- MongoDB: https://www.mongodb.com/docs/
- PM2: https://pm2.keymetrics.io/docs/
- Nginx: https://nginx.org/en/docs/
- Let's Encrypt: https://letsencrypt.org/docs/

### Monitoring Tools:
- PM2 built-in monitoring: `pm2 monit`
- Nginx status: `systemctl status nginx`
- Server resources: `htop`, `df -h`, `free -h`

### Emergency Contacts:
- Server issues: Check logs first
- Database issues: Review MongoDB logs
- Application errors: Check PM2 logs
- SSL issues: Check certbot logs

---

## Success Indicators

Your deployment is successful when:

✅ `pm2 status` shows app as "online"
✅ https://kakobuy-spreadsheet.com loads without errors
✅ SSL certificate is valid (green padlock)
✅ MongoDB connection is established (check logs)
✅ Products load correctly on the spreadsheet page
✅ Google Analytics tracking works
✅ No errors in PM2 logs
✅ Nginx is running without errors
✅ Firewall is active and configured

---

**Last Updated:** December 8, 2025
**Deployment Script Version:** 1.0
**Compatible With:** Next.js 15.5.7+
