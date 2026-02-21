import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QINMU 沁木國際 - Premium K-Beauty",
  description: "Premium Korean Beauty & Skincare by QINMU",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
