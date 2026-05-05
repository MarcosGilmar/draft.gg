'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createAccountBodySchema,
  CreateAccountBodySchema,
} from '@repo/shared/schemas/auth';
import { Check, Eye, EyeOff, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';

const passwordRequirements = [
  { label: 'Mínimo 8 caracteres', check: (value: string) => value.length >= 8 },
  {
    label: 'Pelo menos uma letra maiúscula',
    check: (value: string) => /[A-Z]/.test(value),
  },
  {
    label: 'Pelo menos um número',
    check: (value: string) => /[0-9]/.test(value),
  },
];

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { control, handleSubmit } = useForm<CreateAccountBodySchema>({
    resolver: zodResolver(createAccountBodySchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    mode: 'onTouched',
  });

  const passwordValue = useWatch({ control, name: 'password' });

  const onSubmit = () => {};

  return (
    <Card className="w-full max-w-md">
      <CardTitle className="flex justify-center items-center text-foreground text-lg">
        Crie sua conta
      </CardTitle>
      <CardContent>
        <form
          id="form-id"
          onSubmit={(event) => void handleSubmit(onSubmit)(event)}
        >
          <FieldGroup>
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name-input">
                    Informe o seu nome
                  </FieldLabel>
                  <Input
                    {...field}
                    id="name-input"
                    aria-invalid={fieldState.invalid}
                    placeholder="John Doe"
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
                    <span>Adicione uma senha</span>
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
                  {passwordValue && (
                    <ul>
                      {passwordRequirements.map((req) => {
                        const isValid = req.check(passwordValue ?? '');
                        return (
                          <li key={req.label}>
                            <span
                              className={cn(
                                'flex w-full items-center justify-start gap-2',
                                isValid ? 'text-success' : 'text-destructive',
                              )}
                            >
                              {isValid ? <Check size={12} /> : <X size={12} />}
                              {req.label}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" form="form-id" className="w-full h-12">
          Criar conta
        </Button>

        <Button asChild variant="link" className="w-full h-12">
          <Link href={'/login'}>Já possui uma conta?</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
