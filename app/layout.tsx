import type { Metadata } from 'next';
import { ABeeZee } from 'next/font/google';
import './globals.tail.css';
import Navbar from '@/components/Navbar';
import { ThemeProvider } from '@/components/theme-provider';
import Provider from '@/components/Provider';
import { Toaster } from '@/components/ui/toaster';

const abeezee = ABeeZee({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-abeezee',
});

export const metadata: Metadata = {
  title: 'Project Gallery',
  description: 'The GitHub Frontend',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={abeezee.className}>
        <Provider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <Navbar />
            {children}
          </ThemeProvider>
        </Provider>
        <Toaster />
      </body>
    </html>
  );
}
