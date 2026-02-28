import { GameProvider } from '@/components/game-context';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Math Fast - Multiplayer Math Game',
  description:
    'A fast-paced multiplayer math game where speed and accuracy matter',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GameProvider>
          <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
            {children}
          </div>
        </GameProvider>
      </body>
    </html>
  );
}
