import Image from 'next/image';
import LoginForm from './login-form';

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-end min-h-screen gap-10 pb-20">
      <Image
        src="/LogoIcon.png"
        alt="Logo icon"
        height={200}
        width={200}
        className="absolute top-0 -translate-y-5"
      />
      <div className="flex flex-col items-center justify-center gap-2.5 mb-5">
        <h1 className="text-foreground-muted font-bold text-5xl">Draft.GG</h1>
        <p className="text-foreground font-semibold text-xl">
          Organize suas partidas
        </p>
      </div>

      <LoginForm />
    </div>
  );
}
