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
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';

export default function LoginForm() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = () => {};

  return (
    <Card className="w-full max-w-lg">
      <CardTitle className="flex justify-center items-center text-foreground text-lg">
        Entre na sua conta
      </CardTitle>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                    <FieldError errors={[fieldState.error]} />
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
                  <Input
                    {...field}
                    id="password-input"
                    aria-invalid={fieldState.invalid}
                    placeholder="Digite sua senha"
                    className="h-12 rounded-xl"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full h-12">
          Login
        </Button>
        <span className="text-foreground">ou</span>
        <Button variant="outline" className="w-full h-12">
          Login com o Google
        </Button>
        <Button variant="link" className="pt-10 w-full h-12">
          Ainda não possui uma conta?
        </Button>
      </CardFooter>
    </Card>
  );
}
