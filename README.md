# Website Uptime Monitor Discord Bot

A Discord bot that monitors website uptime and sends notifications when sites are down or responding slowly.

## Features

- Regular monitoring of configured websites
- Response time tracking
- Notifications for:
  - Site downtime
  - Slow response times
  - Error details
- Configurable monitoring intervals
- Rich Discord embeds for status updates

## Setup

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
4. Set up your Discord bot:

   - Create a new bot at [Discord Developer Portal](https://discord.com/developers/applications)
   - Get your bot token and add it to the `.env` file
   - Add the bot to your server with proper permissions (Send Messages, Embed Links)
   - Copy your channel ID and add it to the `.env` file

5. Configure your sites:
   - Create or edit `data.ts` in the root directory with your sites to monitor
   - The repository contains a sample data.ts template you can use
   - This file is gitignored to keep your site configuration private

## Running the Bot

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm run build
npm start
```

## Configuration

Each site in the configuration can have the following properties:

```typescript
{
    url: string;           // The URL to monitor
    name: string;          // Display name for the site
    expectedResponseTime?: number; // Maximum acceptable response time in ms (default: 5000)
}
```

## Discord Notifications

The bot will send notifications to your configured Discord channel when:

- A site goes down (cannot be reached)
- Response time exceeds the expected threshold
- Any errors occur during monitoring

Notifications include:

- Site name
- Current status (UP/DOWN/SLOW)
- Response time
- Error details (if any)
- Timestamp of the check

## Deploying with PM2 on AWS

This project includes PM2 configuration for easy deployment on AWS or other servers.

### Prerequisites

- AWS EC2 instance with Node.js installed (recommended Amazon Linux 2, Ubuntu, or Debian)
- Git installed on the server

### Deployment Steps

1. Connect to your AWS EC2 instance via SSH:

   ```bash
   ssh -i your-key.pem ec2-user@your-ec2-instance-ip
   ```

2. Clone the repository:

   ```bash
   git clone https://your-repo-url.git
   cd site-uptime-monitor-bot
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file with your configuration:

   ```bash
   cp .env.example .env
   # Edit the .env file with your Discord bot token and channel ID
   nano .env
   ```

5. Create your site monitoring configuration:

   ```bash
   # Create or edit data.ts file with your sites to monitor
   nano data.ts
   ```

   Add your site configuration to data.ts:

   ```typescript
   import { SiteConfig } from "./src/types";

   export const sitesToMonitor: SiteConfig[] = [
     {
       url: "https://yoursite.com",
       name: "Your Site Name",
       expectedResponseTime: 3000, // 3 seconds
     },
     // Add more sites as needed
   ];
   ```

   > **Note**: The data.ts file is included in .gitignore to prevent accidentally committing your private site data to the public repository.

6. Create logs directory:

   ```bash
   mkdir -p logs
   ```

7. Build and start the application with PM2:
   ```bash
   npm run deploy
   ```

### PM2 Commands

- Start the application: `npm run pm2:start`
- Stop the application: `npm run pm2:stop`
- Restart the application: `npm run pm2:restart`
- Check status: `npm run pm2:status`
- View logs: `npm run pm2:logs`

### Setting Up PM2 to Start on System Boot

To ensure the bot starts automatically when the server reboots:

```bash
pm2 startup
# Run the command provided in the output
pm2 save
```

### Updating the Application

To update the application when new code is available, you can either:

1. Run the provided update script:

   ```bash
   ./update.sh
   ```

   This script will:

   - Pull latest changes from git
   - Install dependencies
   - Build the application
   - Start or restart the PM2 process
   - Save the PM2 configuration

2. Or manually run each step:
   ```bash
   git pull
   npm install
   npm run build
   npm run pm2:restart
   ```
