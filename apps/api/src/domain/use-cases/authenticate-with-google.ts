import { Injectable } from '@nestjs/common';
import { Either, right } from 'src/core/either';
import { User } from '../entities/user';
import { UsersRepository } from '../repositories/users-repository';
import { Encrypter } from '../cryptography/encrypter';
import { InvalidCredentialsError } from '../errors/invalid-credentials-error';

interface AuthenticateWithGoogleUseCaseInput {
  email: string;
  name: string;
  avatar?: string
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
    avatar
  }: AuthenticateWithGoogleUseCaseInput): Promise<AuthenticateWithGoogleUseCaseOutput> {
    let user = await this.usersRepository.findByEmail(email);

    if(!user) {
      user = User.create({
        email, name, avatar, password: null
      })
    }

    const accessToken = await this.encrypter.encrypt({
      sub: user.id.toValue(),
    });

    return right({
      accessToken,
    });
  }
}
