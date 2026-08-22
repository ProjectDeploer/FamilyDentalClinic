import type { MetadataRoute } from "next";
import { services } from "@/config/services";
import { absoluteUrl } from "@/lib/utils";
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/about-us",
    "/services",
    "/reviews",
    "/book-appointment",
    "/contact",
    "/privacy-policy",
  ];
  return [
    ...paths,
    ...services.map((service) => `/services/${service.slug}`),
  ].map((path) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("/services") ? 0.8 : 0.6,
  }));
}
