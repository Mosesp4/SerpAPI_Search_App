import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SerpApi Search App",
  description:
    "Live Google search results powered by SerpApi — built with Next.js, TypeScript, and Tailwind CSS.",
  openGraph: {
    title: "SerpApi Search App",
    description: "Live Google search results via SerpApi",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
