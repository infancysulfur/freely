import type { MetadataRoute } from "next";

const routes = [
  "",
  "/calculators",
  "/calculators/fire",
  "/calculators/investment/compound",
  "/calculators/investment/target",
  "/calculators/investment/dividend",
  "/calculators/loan/equal-payment",
  "/calculators/loan/equal-principal",
  "/calculators/loan/bullet-payment",
  "/calculators/savings/deposit",
  "/calculators/savings/installment",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://freely-78hbdkt9d-infancysulfurs-projects.vercel.app";

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
