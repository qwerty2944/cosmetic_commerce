import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BLOOMING - Premium K-Beauty",
  description: "Premium Korean Beauty & Skincare",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
