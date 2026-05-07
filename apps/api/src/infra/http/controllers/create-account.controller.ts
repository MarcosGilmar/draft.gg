import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common';
import {
  type CreateAccountBodySchema,
  createAccountBodySchema,
} from '@repo/shared/schemas/auth';
import { AuthenticateUserUseCase } from 'src/domain/use-cases/authenticate-user';
import { CreateUserUseCase } from 'src/domain/use-cases/create-user';
import { Public } from 'src/infra/auth/public';
import { ZodValidationPipe } from 'src/infra/http/pipes/zod-validation-pipe';

@Controller('/accounts')
export class CreateAccountController {
  constructor(
    private readonly createUser: CreateUserUseCase,
    private readonly authenticateUser: AuthenticateUserUseCase,
  ) {}

  @Post()
  @Public()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handle(@Body() body: CreateAccountBodySchema) {
    const { name, email, password } = body;

    const createUserResult = await this.createUser.execute({
      name,
      email,
      password,
    });

    if (createUserResult.isLeft()) {
      throw new ConflictException();
    }

    const authenticateUserResult = await this.authenticateUser.execute({
      email,
      password,
    });

    if (authenticateUserResult.isLeft()) {
      throw new UnauthorizedException();
    }

    const { accessToken } = authenticateUserResult.value;

    return { access_token: accessToken };
  }
}
