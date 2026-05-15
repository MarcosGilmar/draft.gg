import { DashboardFooter } from '@/components/layout/dashboard-footer';
import { DashboardHeader } from '@/components/layout/dashboard-header';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <DashboardHeader />
      {children}
      <DashboardFooter />
    </>
  );
}
