import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { stages } from "@/data/stages";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const home: MetadataRoute.Sitemap[number] = {
    url: site.url,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 1,
  };
  const caseStudies: MetadataRoute.Sitemap = stages.map((s) => ({
    url: `${site.url}/stages/${s.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.9,
  }));
  return [home, ...caseStudies];
}
