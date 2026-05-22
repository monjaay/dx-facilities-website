import type { MetadataRoute } from "next";
import { services } from "@/data/services";

const BASE_URL = "https://www.dxfacilities.com";

// Update this date whenever major content changes are deployed
const SITE_UPDATED = "2025-05-22";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: SITE_UPDATED,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: SITE_UPDATED,
      changeFrequency: "yearly",
      priority: 0.90,
    },
    {
      url: `${BASE_URL}/a-propos`,
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly",
      priority: 0.80,
    },
    {
      url: `${BASE_URL}/dextera-group`,
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly",
      priority: 0.70,
    },
    {
      url: `${BASE_URL}/mentions-legales`,
      lastModified: SITE_UPDATED,
      changeFrequency: "yearly",
      priority: 0.20,
    },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${BASE_URL}/services/${s.slug}`,
    lastModified: SITE_UPDATED,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
