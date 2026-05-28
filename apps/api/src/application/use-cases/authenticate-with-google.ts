import { Injectable } from '@nestjs/common';
import { Either, right } from 'src/core/either';
import { User } from '../../domain/entities/user';
import { InvalidCredentialsError } from '../../domain/errors/invalid-credentials-error';
import { UsersRepository } from '../../domain/repositories/users-repository';
import { Encrypter } from '../ports/cryptography/encrypter';

interface AuthenticateWithGoogleUseCaseInput {
  email: string;
  name: string;
  avatar?: string;
}

type AuthenticateWithGoogleUseCaseOutput = Either<
  InvalidCredentialsError,
  { accessToken: string }
>;

@Injectable()
export class AuthenticateWithGoogleUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    name,
    avatar,
  }: AuthenticateWithGoogleUseCaseInput): Promise<AuthenticateWithGoogleUseCaseOutput> {
    let user = await this.usersRepository.findByEmail(email);

    if (!user) {
      user = User.create({
        email,
        name,
        avatar,
        password: null,
      });

      await this.usersRepository.create(user);
    }

    const accessToken = await this.encrypter.encrypt({
      sub: user.id.toValue(),
    });

    return right({
      accessToken,
    });
  }
}
