import { logoutAction } from '@/actions/logoutAction';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export function DashboardHeader() {
  return (
    <header className="flex items-center bg-linear-to-r from-accent-muted to-accent-muted h-15 min-w-screen">
      <div className="w-30 h-30 relative overflow-hidden">
        <Image
          src="/LogoIcon.png"
          alt="Logo icon"
          fill
          className="object-contain scale-70"
        />
      </div>

      <h1 className="font-sans italic text-accent tracking-tight font-bold text-xl">
        Draft.GG
      </h1>

      <form action={logoutAction} className="ml-auto flex items-center p-5">
        <Button type="submit">Logout</Button>
      </form>
    </header>
  );
}
