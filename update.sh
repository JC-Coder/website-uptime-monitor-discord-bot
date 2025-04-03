#!/bin/bash

# Exit on error
set -e

echo "==== Starting update process ===="
echo "Pulling latest changes from git..."
git pull

echo "Installing dependencies..."
npm install

echo "Building application..."
npm run build

# Check if PM2 is running the app
if pm2 list | grep -q "site-uptime-monitor-bot"; then
    echo "Restarting PM2 process..."
    npm run pm2:restart
else
    echo "Starting new PM2 process..."
    npm run pm2:start
fi

# Save the PM2 process list to ensure it restarts on reboot
pm2 save

echo "==== Update completed successfully ===="
echo "You can check the status with: npm run pm2:status"
echo "You can view logs with: npm run pm2:logs" 
