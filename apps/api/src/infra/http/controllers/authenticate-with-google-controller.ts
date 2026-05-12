import {
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common';
import {
  type AuthenticateWithGoogleBodySchema,
  authenticateWithGoogleBodySchema,
} from '@repo/shared/schemas/auth';
import { AuthenticateWithGoogleUseCase } from 'src/domain/use-cases/authenticate-with-google';
import { Public } from 'src/infra/auth/public';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';

@Controller('api/auth/google') //verificar endpoint
export class AuthenticateWithGoogle {
  constructor(
    private readonly authenticateWithGoogle: AuthenticateWithGoogleUseCase,
  ) {}

  @Post()
  @Public()
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(authenticateWithGoogleBodySchema))
  async handle(@Body() body: AuthenticateWithGoogleBodySchema) {
    const { email, name, avatar } = body;

    const result = await this.authenticateWithGoogle.execute({
      email,
      name,
      avatar,
    });

    if (result.isLeft()) {
      const error = result.value;

      throw new UnauthorizedException(error.message);
    }

    const { accessToken } = result.value;

    return { access_token: accessToken };
  }
}
