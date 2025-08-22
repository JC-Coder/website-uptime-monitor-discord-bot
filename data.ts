import { SiteConfig } from "./src/types";

export const sitesToMonitor: SiteConfig[] = [
  // Production websites
  {
    url: "https://ogaticket.com",
    name: "OgaTicket Production Landing Page",
    expectedResponseTime: 6000, // 6 seconds
  },
  {
    url: "https://watawi.ogaticket.com",
    name: "Watawi Website",
    expectedResponseTime: 6000, // 6 seconds
  },

  // Staging website
  {
    url: "https://staging-v1.ogaticket.com",
    name: "Ogaticket Staging V1 Website",
    expectedResponseTime: 6000, // 6 seconds
  },

  // Production API
  {
    url: "https://api-v1.ogaticket.com/api/setting",
    name: "OgaTicket Production API",
    expectedResponseTime: 6000, // 6 seconds
  },

  // Staging API
  {
    url: "https://api-staging-v1.ogaticket.com/api/setting",
    name: "OgaTicket Staging API",
    expectedResponseTime: 6000, // 6 seconds
  },
];
