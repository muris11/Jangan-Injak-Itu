import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://jangan-injak-itu.vercel.app";
  return ["/", "/play", "/leaderboard", "/how-to-play", "/settings"].map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.8,
  }));
}
