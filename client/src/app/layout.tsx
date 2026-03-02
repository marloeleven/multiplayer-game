import { GameProvider } from '@/components/game-context';
import { PWARegister } from '@/components/pwa-register';
import { withPrefix } from '@/lib/utils';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Math Fast - Multiplayer Math Game',
  description:
    'A fast-paced multiplayer math game where speed and accuracy matter',
  manifest: withPrefix('/manifest.json'),
  icons: {
    icon: withPrefix('/favicon.ico'),
    shortcut: withPrefix('/favicon-16x16.png'),
    apple: withPrefix('/apple-touch-icon.png'),
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: '#4f46e5',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Math Fast',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PWARegister />
        <Suspense fallback="Loading...">
          <GameProvider>
            <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
              {children}
            </div>
          </GameProvider>
        </Suspense>
      </body>
    </html>
  );
}
