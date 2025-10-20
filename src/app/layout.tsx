import type {Metadata} from 'next';
import { Toaster } from "@/components/ui/toaster"
import { Poppins } from 'next/font/google';
import './globals.css';
import GoogleAdSense from '@/components/app/google-adsense';

export const metadata: Metadata = {
  title: 'TipSplit - Easy Tip Calculator',
  description: 'A free and easy-to-use tip calculator app to help calculate tips and split bills among friends. Supports multiple currencies and provides a world-class user experience.',
  keywords: ['tip calculator', 'split bill', 'restaurant tip', 'tipping', 'gratuity calculator', 'currency converter'],
  applicationName: 'TipSplit',
  authors: [{ name: 'Firebase Studio' }],
  creator: 'Firebase Studio',
  publisher: 'Firebase Studio',
};

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${poppins.variable}`}>
      <head>
        <GoogleAdSense />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
