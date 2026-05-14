import type { Metadata } from 'next';
import { Suspense } from 'react';
import MetaPixel from '@/components/meta-pixel';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'XL Elite Bootcamp - Formation Microsoft Excel Expert',
    template: '%s | XL Elite Bootcamp',
  },
  description: 'Devenez Expert Excel certifié en 5 jours. Formation intensive Microsoft Excel Expert avec certification officielle. Boostez votre carrière professionnelle.',
  keywords: [
    'Excel Expert',
    'Formation Excel',
    'Certification Microsoft',
    'Excel Avancé',
    'Formation Excel Ouagadougou',
    'XL Elite Bootcamp',
  ],
  authors: [{ name: 'Léonce Toundé SODJINOU' }],
  creator: 'XL Elite Bootcamp',
  publisher: 'XL Elite Bootcamp',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    title: 'XL Elite Bootcamp - Formation Microsoft Excel Expert',
    description: 'Devenez Expert Excel certifié en 5 jours. Formation intensive avec certification Microsoft.',
    siteName: 'XL Elite Bootcamp',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'XL Elite Bootcamp - Formation Excel Expert',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'XL Elite Bootcamp - Formation Microsoft Excel Expert',
    description: 'Devenez Expert Excel certifié en 5 jours. Formation intensive avec certification Microsoft.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION } }
    : {}),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <Suspense fallback={null}>
          <MetaPixel />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
