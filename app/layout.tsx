import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";

const inter = Roboto({ weight:"400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ecommerse shop with 3D preview",
  description: "Ecommerse shop with 3D preview",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth bg-stone-950">
      <body >{children}</body>
    </html>
  );
}
