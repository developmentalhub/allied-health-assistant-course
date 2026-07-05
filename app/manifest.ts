import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} | ${siteConfig.businessName}`,
    short_name: "AHA PD",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#faf8f5",
    theme_color: "#0f766e",
    icons: [
      {
        src: "/icon",
        sizes: "64x64",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}