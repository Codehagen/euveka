export const siteConfig = {
  name: "Euveka",
  description: "Euveka Device Controller",
  cta: "Get Started",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  keywords: [
    "Euveka",
    "Device Controller",
    "AI",
    "Agent",
    "SDK",
    "Multi-Agent Systems",
    "Tool Integration",
    "Workflow Automation",
  ],
  links: {
    email: "support@euv.com",
    twitter: "https://twitter.com/euv",
    discord: "https://discord.gg/euv",
    github: "https://github.com/euv",
    instagram: "https://instagram.com/euv",
  },
};

export type SiteConfig = typeof siteConfig;
