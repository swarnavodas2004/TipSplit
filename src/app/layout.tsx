import type {Metadata} from 'next';
import { Toaster } from "@/components/ui/toaster"
import { Poppins } from 'next/font/google';
import './globals.css';

export const metadata: Metadata = {
  title: 'TipSplit',
  description: 'A tipping calculator app to help calculate tip on a bill amongst friends.',
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
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
