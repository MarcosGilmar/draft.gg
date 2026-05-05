import Image from 'next/image';
import RegisterForm from './register-form';

export default function Register() {
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

      <RegisterForm />
    </div>
  );
}
