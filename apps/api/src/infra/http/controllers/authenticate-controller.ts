import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthenticateUserUseCase } from 'src/domain/use-cases/authenticate-user';
import { ZodValidationPipe } from 'src/infra/http/pipes/zod-validation-pipe';
import z from 'zod';

const authenticateBodySchema = z.object({
  email: z.email('E-mail inválido'),
  password: z.string().min(8, 'Senha deve conter pelo menos 8 caracteres'),
});

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>;

@Controller('/sessions')
export class AuthenticateController {
  constructor(
    private readonly authenticateUser: AuthenticateUserUseCase,
    private readonly jwtService: JwtService,
  ) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(@Body() body: AuthenticateBodySchema) {
    const { email, password } = body;

    const { user } = await this.authenticateUser.execute({ email, password });

    const accessToken = this.jwtService.sign({
      sub: user.id.toValue(),
    });

    return { access_token: accessToken };
  }
}
