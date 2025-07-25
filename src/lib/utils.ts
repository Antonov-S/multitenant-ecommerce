import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateTenantURL(tenantSlug: string) {
  // In development use normal routing
  if (process.env.NODE_ENV === "development") {
    return `${process.env.NEXT_PUBLIC_APP_URL}/tenants/${tenantSlug}`;
  }

  const protocol = "https";
  const domain = process.env.NEXT_PUBLIC_ROOT_DOMAIN!;

  // if (process.env.NODE_ENV === "development") {
  //   protocol = "http";
  // }

  // In production use subdomain routing
  return `${protocol}://${tenantSlug}.${domain}`;
}

export function formatCurrency(price: number | string) {
  const formatedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(Number(price));

  return formatedPrice;
}
