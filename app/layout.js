import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
    apple: "/favicon.ico" // iOS devices
  },
  openGraph: {
    title: "Enviol Polytech Solutions | Sustainable & Recycled Polyols",
    description: "Enviol Polytech Solutions, located in Kanpur, Uttar Pradesh, India, provides high-quality sustainable, recycled, and blended Polyester & Polyether Polyols for CASE applications.",
    url: "https://www.enviol.com",
    siteName: "Enviol Polytech Solutions",
    images: [
      {
        url: "/images/og-image.png", // Replace with your Open Graph image
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
    images: ["/images/og-image.png"], // Replace with Twitter image
    creator: "@EnviolPolytech"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-lightbg text-industrial">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
