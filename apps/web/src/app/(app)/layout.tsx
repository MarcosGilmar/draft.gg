import { AppDrawer } from '@/components/layout/app-drawer';
import { AppFooter } from '@/components/layout/app-footer';
import { AppHeader } from '@/components/layout/app-header';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col">
      <AppHeader />
      <div className="relative flex">
        <AppDrawer />
        <main>{children}</main>
      </div>
      <AppFooter />
    </div>
  );
}
