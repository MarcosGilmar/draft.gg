import Image from 'next/image';
import ForgotPasswordForm from './forgot-password-form';

export default function ForgotPassword() {
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

      <ForgotPasswordForm />
    </div>
  );
}
