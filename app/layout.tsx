import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/700.css";
import "@fontsource/playfair-display/500.css";
import "@fontsource/playfair-display/600.css";
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/layout/footer";
import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp";
import { Header } from "@/components/layout/header";
import { clinic } from "@/config/clinic";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl()),
  title: {
    default: "Family Dental Clinic by Dr Bushra",
    template: "%s | Family Dental Clinic",
  },
  description: clinic.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_PK",
    siteName: clinic.name,
    title: `${clinic.name} ${clinic.brandLine}`,
    description: clinic.description,
    images: [
      {
        url: "/images/hero/consultation.png",
        width: 1140,
        height: 1520,
        alt: "A calm dental consultation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${clinic.name} ${clinic.brandLine}`,
    description: clinic.description,
    images: ["/images/hero/consultation.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#F8F5EF",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: clinic.name,
    description: clinic.description,
    url: absoluteUrl(),
    telephone: clinic.phone,
    email: clinic.email,
    address: clinic.address,
    image: absoluteUrl("/images/clinic/treatment-room.png"),
  };
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
