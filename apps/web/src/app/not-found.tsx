import { Frown } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full gap-10">
      <Frown className="h-15 w-15 text-accent-muted" />
      <div className="text-4xl text-accent-muted font-black tracking-wide">
        404 Not Found
      </div>
    </div>
  );
}
