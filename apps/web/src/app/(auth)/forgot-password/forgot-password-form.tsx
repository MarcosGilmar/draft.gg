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
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';

const forgotPasswordSchema = z.object({
  email: z.email('E-mail inválido'),
});

type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordForm() {
  const { control, handleSubmit } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onTouched',
  });

  const onSubmit = () => {};

  return (
    <Card className="w-full max-w-md">
      <CardTitle className="flex justify-center items-center text-foreground text-lg">
        Recupere sua conta
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
                  <Button type="submit" form="form-id" className="w-full h-12">
                    Enviar código de verificação para o email
                  </Button>
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2"></CardFooter>
    </Card>
  );
}
