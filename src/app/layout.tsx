import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import StarryBackground from '@/components/StarryBackground';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Edward Wibowo | Portfolio',
  description:
    'Portfolio of Edward Wibowo, a Computer Science student building AI systems and full-stack software.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="relative min-h-screen overflow-x-hidden bg-[#0A0E17] text-white antialiased">
        <StarryBackground />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
