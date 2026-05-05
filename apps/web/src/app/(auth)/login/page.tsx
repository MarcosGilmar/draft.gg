import Image from 'next/image';
import LoginForm from './login-form';

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="w-30 h-30 relative overflow-hidden">
        <Image
          src="/LogoIcon.png"
          alt="Logo icon"
          fill
          className="object-contain scale-140"
        />
      </div>
      <div className="flex flex-col items-center justify-center mb-5">
        <h1 className="text-foreground-muted font-bold text-4xl">Draft.GG</h1>
        <p className="text-foreground text-base">Organize suas partidas</p>
      </div>

      <LoginForm />
    </div>
  );
}
