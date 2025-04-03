import axios from "axios";
import { SiteConfig, MonitoringResult } from "./types";

export class SiteMonitor {
  private sites: SiteConfig[];
  private defaultTimeout = 5000; // 5 seconds

  constructor(sites: SiteConfig[]) {
    this.sites = sites;
  }

  async checkSite(site: SiteConfig): Promise<MonitoringResult> {
    const startTime = Date.now();
    try {
      const response = await axios.get(site.url, {
        timeout: this.defaultTimeout,
      });

      const responseTime = Date.now() - startTime;
      const expectedTime = site.expectedResponseTime ?? this.defaultTimeout;

      return {
        site,
        status: responseTime > expectedTime ? "slow" : "up",
        responseTime,
        timestamp: new Date(),
      };
    } catch (error) {
      console.error("Error checking site", site.url, error);
      return {
        site,
        status: "down",
        responseTime: Date.now() - startTime,
        timestamp: new Date(),
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  async checkAllSites(): Promise<MonitoringResult[]> {
    const promises = this.sites.map((site) => this.checkSite(site));
    return Promise.all(promises);
  }
}
