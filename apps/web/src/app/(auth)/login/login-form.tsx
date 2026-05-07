'use client';

import { loginAction } from '@/actions/loginAction';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  AuthenticateBodySchema,
  authenticateBodySchema,
} from '@repo/shared/schemas/auth';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { control, handleSubmit } = useForm<AuthenticateBodySchema>({
    resolver: zodResolver(authenticateBodySchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onTouched',
  });

  const onSubmit = async (data: AuthenticateBodySchema) => {
    await loginAction(data);
  };

  return (
    <Card className="w-full max-w-md">
      <CardTitle className="flex justify-center items-center text-foreground text-lg">
        Entre na sua conta
      </CardTitle>
      <CardContent>
        <form
          id="form-id"
          onSubmit={(event) => void handleSubmit(onSubmit)(event)}
        >
          <FieldGroup>
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email-input">
                    Informe o seu email
                  </FieldLabel>
                  <Input
                    {...field}
                    id="email-input"
                    aria-invalid={fieldState.invalid}
                    placeholder="johndoe@gmail.com"
                    className="h-12 rounded-xl"
                  />
                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="text-xs text-destructive"
                    />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password-input">
                    <div className="flex items-center w-full justify-between">
                      <span>Senha</span>
                      <Link
                        href={'#'}
                        className="text-xs text-primary underline-offset-4 hover:underline"
                      >
                        Esqueceu sua senha?
                      </Link>
                    </div>
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      {...field}
                      id="password-input"
                      type={showPassword ? 'text' : 'password'}
                      aria-invalid={fieldState.invalid}
                      placeholder="Digite sua senha"
                      className="h-12 rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="flex absolute right-3 top-1/2 -translate-y-1/2 text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff size={18} className="text-foreground-muted" />
                      ) : (
                        <Eye size={18} className="text-foreground-muted" />
                      )}
                    </button>
                  </div>
                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="text-xs text-destructive"
                    />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" form="form-id" className="w-full h-12">
          Login
        </Button>
        <span className="text-foreground">ou</span>
        <Button variant="outline" className="w-full h-12">
          Login com o Google
        </Button>

        <Button asChild variant="link" className="mt-5 w-full h-12">
          <Link href={'/register'}>Ainda não possui uma conta?</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
