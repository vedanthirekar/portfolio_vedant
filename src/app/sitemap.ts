import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const routes = ["", "/work", "/about", "/now", "/changelog", "/how-this-works", "/api-docs"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" || path === "/now" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
