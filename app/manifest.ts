import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name, short_name: "Obijiaku Foundation", description: SITE.description, lang: "en-NG",
    start_url: "/", display: "standalone", background_color: "#f4f2e8", theme_color: "#0b3d22",
    icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }, { src: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  };
}
