import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common';
import {
  type CreateAccountBodySchema,
  createAccountBodySchema,
} from '@repo/shared/schemas/auth';
import { CreateUserUseCase } from 'src/domain/use-cases/create-user';
import { Public } from 'src/infra/auth/public';
import { ZodValidationPipe } from 'src/infra/http/pipes/zod-validation-pipe';

@Controller('/accounts')
export class CreateAccountController {
  constructor(private readonly createUser: CreateUserUseCase) {}

  @Post()
  @Public()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handle(@Body() body: CreateAccountBodySchema) {
    const { name, email, password } = body;

    await this.createUser.execute({ name, email, password });
  }
}
