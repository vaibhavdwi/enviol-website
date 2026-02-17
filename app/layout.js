import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Enviol Polytech Solutions",
  description: "Sustainable Polyester & Polyether Polyols for CASE Applications."
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