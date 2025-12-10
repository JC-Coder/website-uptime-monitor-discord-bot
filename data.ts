import { SiteConfig } from "./src/types";

// Timeout set to 20 seconds for all sites

export const sitesToMonitor: SiteConfig[] = [
    // Production websites
    {
        url: "https://ogaticket.com",
        name: "OgaTicket Production Landing Page",
        expectedResponseTime: 20000,
    },
    {
        url: "https://hubafric.ogaticket.com",
        name: "HubAfric Website",
        expectedResponseTime: 20000,
    },

    // Staging website
    {
        url: "https://staging-v1.ogaticket.com",
        name: "Ogaticket Staging V1 Website",
        expectedResponseTime: 20000,
    },

    // Production API
    {
        url: "https://api-v1.ogaticket.com/api/setting",
        name: "OgaTicket Production API",
        expectedResponseTime: 20000,
    },

    // Staging API
    {
        url: "https://api-staging-v1.ogaticket.com/api/setting",
        name: "OgaTicket Staging API",
        expectedResponseTime: 20000,
    },
];
