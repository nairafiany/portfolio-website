import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://nairafiany.com"),

  title: {
    default: "Naira Shafiqa Afiany | Portfolio",
    template: "%s | Naira Shafiqa Afiany",
  },
  description:
    "Portfolio of Naira Shafiqa Afiany, a 3rd-year Information Systems student at Universitas Indonesia specialized in Web Development, System Analysis, and AI.",

  keywords: [
    "Naira Shafiqa Afiany",
    "Portfolio",
    "Web Developer",
    "Next.js",
    "Universitas Indonesia",
  ],

  authors: [{ name: "Naira Shafiqa Afiany" }],

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Naira Shafiqa Afiany",

    description:
      "Aspiring Developer & Information Systems Student at UI. Check out my portfolio!",

    url: "https://nairafiany.com",
    siteName: "Naira Shafiqa Afiany",
    images: [
      {
        url: "/images/preview.png",
        width: 1200,
        height: 630,
        alt: "Naira Shafiqa Afiany Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Naira Shafiqa Afiany",
    description: "Aspiring Developer & Information Systems Student at UI.",
    images: ["/images/preview.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
