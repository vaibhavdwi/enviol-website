import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Script from "next/script";
import GoogleAnalytics from "../components/GoogleAnalytics";

export const metadata = {
  title: {
	  default:
  "Polyester & Polyether Polyol Manufacturers India | PIR & PUF Polyol Supplier | Enviol",
	  template: "%s | Enviol",
	  },
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
  applicationName: "Enviol Polytech Solutions",
   referrer: "origin-when-cross-origin",

  category: "Industrial Chemicals",

  classification:
    "Polyester Polyol Manufacturing and Polyurethane Raw Materials",

  generator: "Next.js",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  authors: [{ name: "Enviol Polytech Solutions", url: "https://www.enviol.com" }],
  creator: "Enviol Polytech Solutions",
  publisher: "Enviol Polytech Solutions",
  metadataBase: new URL("https://www.enviol.com"),
  manifest: "/site.webmanifest",
  robots: {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
},
  icons: {
    icon: "/favicon.ico",
	shortcut: "/favicon.ico",
    apple: "/favicon.ico"
  },
  verification: {
  google: "q1-NkrKUBJGrItwkiCKZtqa9sGHlILaLy3Ar1KCmm60",
},
alternates: {
  canonical: "https://www.enviol.com",
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
    },
  other: {
  "geo.region": "IN-UP",
  "geo.placename": "Kanpur",
  "geo.position": "26.4499;80.3319",
  ICBM: "26.4499, 80.3319",
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
	  <link rel="icon" href="/favicon.ico" sizes="any" />
	  <link rel="apple-touch-icon" href="/favicon.ico" />
	  <meta name="theme-color" content="#42b3a5" />
        {/* Google Analytics GA4 */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-WYLMK5RJJH"
        />
		<Script
	id="organization-schema"
	type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Corporation",

      name: "Enviol Polytech Solutions",

      url: "https://www.enviol.com",

      logo: "https://www.enviol.com/images/logo-n.png",

      description:
        "Manufacturer of sustainable polyester and polyether polyols for polyurethane, rigid foam, PIR insulation and CASE applications.",

      address: {
        "@type": "PostalAddress",
        addressLocality: "Kanpur",
        addressRegion: "Uttar Pradesh",
        addressCountry: "India",
      },

      areaServed: [
        "India",
        "Delhi",
        "Noida",
        "Gurgaon",
        "North India",
		"Gujarat",
		"Maharashtra",
		"Karnataka",
		"Tamil Nadu",
		"Uttar Pradesh",
		"Rajasthan",
		"Madhya Pradesh",
      ],

      industry:
        "Polyurethane Raw Materials Manufacturing",

      keywords: [
  "rigid foam polyol manufacturer india",
  "PIR foam polyol supplier",
  "PUF foam raw material supplier",
  "polyurethane insulation polyol",
  "polyester polyol supplier delhi",
  "polyol manufacturer north india",
  "recycled PET polyol manufacturer",
],
		foundingLocation: {
  "@type": "Place",
  name: "Kanpur, Uttar Pradesh, India",
},

knowsAbout: [
  "Polyester Polyols",
  "Polyether Polyols",
  "Rigid Foam Polyols",
  "PIR Foam Systems",
  "PUF Foam Systems",
  "Chemical Recycling",
  "PET Waste Recycling",
  "Polyurethane Raw Materials",
],
sameAs: [
  "https://www.linkedin.com/company/enviol-polytech-solutions/",
]
    }),
  }}
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
  <GoogleAnalytics measurementId="G-WYLMK5RJJH" />
  <main className="pt-20">
    {children}
  </main>
  <Footer />
</body>
    </html>
  );
}
