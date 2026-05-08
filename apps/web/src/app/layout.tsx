import { Providers } from '@/providers';
import { DM_Sans, Syne } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
});
const syne = Syne({
  subsets: ['latin'],
  variable: '--font-display',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${syne.variable}`}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
