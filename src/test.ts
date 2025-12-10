import dotenv from "dotenv";
import { Client, TextChannel } from "discord.js";

// Load environment variables
dotenv.config();

// Validate required environment variables
const requiredEnvVars = ["DISCORD_TOKEN", "DISCORD_CHANNEL_ID"];
for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        console.error(`Missing required environment variable: ${envVar}`);
        process.exit(1);
    }
}

// Create a new Discord client
const client = new Client({
    intents: [],
});

// When the client is ready, run this code
client.once("ready", async () => {
    console.log("Discord bot is connected!");

    try {
        // Get the channel
        const channel = (await client.channels.fetch(
            process.env.DISCORD_CHANNEL_ID!
        )) as TextChannel;

        if (!channel) {
            console.error(
                "Channel not found! Please check your DISCORD_CHANNEL_ID."
            );
            process.exit(1);
        }

        // Send a test message
        await channel.send(
            "Hello World! Your uptime monitor bot is correctly configured."
        );
        console.log("Test message sent successfully!");
    } catch (error) {
        console.error("Error sending test message:", error);
    } finally {
        // Disconnect the bot after sending the message
        client.destroy();
        console.log("Bot disconnected.");
        process.exit(0);
    }
});

// Login to Discord with the bot token
client.login(process.env.DISCORD_TOKEN).catch((error) => {
    console.error("Failed to log in to Discord:", error);
    process.exit(1);
});
