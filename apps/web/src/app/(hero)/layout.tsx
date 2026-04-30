import { HeroFooter } from '@/components/layout/hero-footer';
import { HeroHeader } from '@/components/layout/hero-header';

export default function HeroLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeroHeader />
      {children}
      <HeroFooter />
    </>
  );
}
