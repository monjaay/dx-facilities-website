import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'Wird Tidjaniya',
  description: "Outil de pratique pour la Tariqa Tidjaniya — Lâzim, Wazifa, Hadratul-Jum'a",
  manifest: '/wird-manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Wird',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function WirdLayout({ children }: { children: React.ReactNode }) {
  return children;
}
