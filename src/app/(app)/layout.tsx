import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { Toaster } from "sonner";
import { TRPCReactProvider } from "@/trpc/client";

import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Multi-Tenant E-commerce Platform",
  description:
    "Build your own digital bazaar with subdomains, Stripe Connect, and just the right amount of indie suffering."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.className} antialiased`}>
        <NuqsAdapter>
          <TRPCReactProvider>
            {children}
            <Toaster />
          </TRPCReactProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
