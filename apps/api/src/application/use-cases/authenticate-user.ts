import { Injectable } from '@nestjs/common';
import { Either, left, right } from 'src/core/either';
import { InvalidCredentialsError } from '../../domain/errors/invalid-credentials-error';
import { UsersRepository } from '../../domain/repositories/users-repository';
import { Encrypter } from '../ports/cryptography/encrypter';
import { HashComparator } from '../ports/cryptography/hash-comparator';

interface AuthenticateUserUseCaseInput {
  email: string;
  password: string;
}

type AuthenticateUserUseCaseOutput = Either<
  InvalidCredentialsError,
  { accessToken: string }
>;

@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashComparator: HashComparator,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUserUseCaseInput): Promise<AuthenticateUserUseCaseOutput> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      return left(new InvalidCredentialsError());
    }

    //typescript narrowing
    if (!user.password) {
      return left(new InvalidCredentialsError());
    }

    const isPasswordValid = await this.hashComparator.compare(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      return left(new InvalidCredentialsError());
    }

    const accessToken = await this.encrypter.encrypt({
      sub: user.id.toValue(),
    });

    return right({
      accessToken,
    });
  }
}
