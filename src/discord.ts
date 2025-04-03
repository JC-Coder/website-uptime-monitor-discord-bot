import { Client, TextChannel, EmbedBuilder } from "discord.js";
import { MonitoringResult } from "./types";

export class DiscordNotifier {
  private client: Client;
  private channelId: string;

  constructor(token: string, channelId: string) {
    this.client = new Client({
      intents: [],
    });
    this.channelId = channelId;

    this.client.login(token);
    this.client.once("ready", () => {
      console.log("Discord bot is ready!");
    });
  }

  async sendNotification(result: MonitoringResult) {
    const channel = (await this.client.channels.fetch(
      this.channelId
    )) as TextChannel;

    const embed = new EmbedBuilder()
      .setTitle(`Site Status: ${result.site.name}`)
      .setColor(this.getStatusColor(result.status))
      .addFields(
        { name: "Status", value: result.status.toUpperCase(), inline: true },
        {
          name: "Response Time",
          value: `${result.responseTime}ms`,
          inline: true,
        },
        { name: "Timestamp", value: result.timestamp.toISOString() }
      );

    if (result.error) {
      embed.addFields({ name: "Error", value: result.error });
    }

    await channel.send({ embeds: [embed] });
  }

  private getStatusColor(status: "up" | "down" | "slow"): number {
    switch (status) {
      case "up":
        return 0x00ff00; // Green
      case "slow":
        return 0xffff00; // Yellow
      case "down":
        return 0xff0000; // Red
    }
  }
}
