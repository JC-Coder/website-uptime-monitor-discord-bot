import dotenv from "dotenv";
import cron from "node-cron";
import { SiteMonitor } from "./monitor";
import { DiscordNotifier } from "./discord";
import { SiteConfig } from "./types";
import { sitesToMonitor } from "../data";

dotenv.config();

// Validate required environment variables
const requiredEnvVars = ["DISCORD_TOKEN", "DISCORD_CHANNEL_ID"];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

// Configure your sites to monitor
const sites: SiteConfig[] = sitesToMonitor;

if (!sites.length) {
  throw new Error("No sites to monitor");
}

const monitor = new SiteMonitor(sites);
const notifier = new DiscordNotifier(
  process.env.DISCORD_TOKEN!,
  process.env.DISCORD_CHANNEL_ID!
);

// Schedule monitoring every 2 minutes
cron.schedule("*/2 * * * *", async () => {
  try {
    console.log("Checking all sites...");
    const results = await monitor.checkAllSites();

    // Send notifications for any issues
    for (const result of results) {
      if (result.status !== "up") {
        await notifier.sendNotification(result);
      }
    }
  } catch (error) {
    console.error("Error in monitoring schedule:", error);
  }
});
