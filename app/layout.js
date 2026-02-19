import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Script from "next/script";
import GoogleAnalytics from "../components/GoogleAnalytics";

export const metadata = {
  title: "Enviol Polytech Solutions | Sustainable & Recycled Polyols for CASE Applications",
  description: "Enviol Polytech Solutions, based in Kanpur, Uttar Pradesh, India, provides high-quality sustainable, recycled, and blended Polyester & Polyether Polyols for Coatings, Adhesives, Sealants, and Elastomers (CASE) applications.",
  keywords: [
    "Sustainable Polyols",
    "Recycled Polyols",
    "Blended Polyols",
    "Polyester Polyols",
    "Polyether Polyols",
    "CASE applications",
    "Enviol Polytech Solutions",
    "Kanpur",
    "Uttar Pradesh",
    "India"
  ],
  authors: [{ name: "Enviol Polytech Solutions", url: "https://www.enviol.com" }],
  creator: "Enviol Polytech Solutions",
  publisher: "Enviol Polytech Solutions",
  viewport: "width=device-width, initial-scale=1.0",
  metadataBase: new URL("https://www.enviol.com"),
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico"
  },
  openGraph: {
    title: "Enviol Polytech Solutions | Sustainable & Recycled Polyols",
    description: "Enviol Polytech Solutions, located in Kanpur, Uttar Pradesh, India, provides high-quality sustainable, recycled, and blended Polyester & Polyether Polyols for CASE applications.",
    url: "https://www.enviol.com",
    siteName: "Enviol Polytech Solutions",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Enviol Polytech Solutions Logo"
      }
    ],
    locale: "en_IN",
    type: "website",
    geo: {
      latitude: "26.4499",
      longitude: "80.3319",
      region: "Uttar Pradesh",
      placename: "Kanpur",
      country: "India"
    }
  },
  twitter: {
    card: "summary_large_image",
    title: "Enviol Polytech Solutions | Sustainable & Recycled Polyols",
    description: "Providing high-quality sustainable, recycled, and blended Polyester & Polyether Polyols for CASE applications from Kanpur, India.",
    images: ["/images/og-image.png"],
    creator: "@EnviolPolytech"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics GA4 */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-WYLMK5RJJH"
        />
        <Script
          id="ga-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-WYLMK5RJJH', { page_path: window.location.pathname });
            `,
          }}
        />
      </head>
      <body className="bg-lightbg text-industrial">
        <Navbar />
        {/* Client component for route change tracking */}
        <GoogleAnalytics measurementId="G-WYLMK5RJJH" />
        {children}
        <Footer />
      </body>
    </html>
  );
}
