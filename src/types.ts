export interface SiteConfig {
  url: string;
  name: string;
  expectedResponseTime?: number; // in milliseconds, default will be 5000
}

export interface MonitoringResult {
  site: SiteConfig;
  status: "up" | "down" | "slow";
  responseTime: number;
  timestamp: Date;
  error?: string;
}
