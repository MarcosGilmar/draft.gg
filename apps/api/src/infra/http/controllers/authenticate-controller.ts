import {
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common';
import {
  type AuthenticateBodySchema,
  authenticateBodySchema,
} from '@repo/shared/schemas/auth';
import { AuthenticateUserUseCase } from 'src/domain/use-cases/authenticate-user';
import { Public } from 'src/infra/auth/public';
import { ZodValidationPipe } from 'src/infra/http/pipes/zod-validation-pipe';

@Controller('/sessions')
export class AuthenticateController {
  constructor(private readonly authenticateUser: AuthenticateUserUseCase) {}

  @Post()
  @Public()
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(@Body() body: AuthenticateBodySchema) {
    const { email, password } = body;

    const result = await this.authenticateUser.execute({
      email,
      password,
    });

    if (result.isLeft()) {
      const error = result.value;

      throw new UnauthorizedException(error.message);
    }

    const { accessToken } = result.value;

    return { access_token: accessToken };
  }
}
