import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Encrypter } from '../cryptography/encrypter';
import { HashComparator } from '../cryptography/hash-comparator';
import { UsersRepository } from '../repositories/users-repository';

interface AuthenticateUserUseCaseInput {
  email: string;
  password: string;
}

@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashComparator: HashComparator,
    private encrypter: Encrypter,
  ) {}

  async execute({ email, password }: AuthenticateUserUseCaseInput) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('User credentials do not match'); // Desacoplar dessa camada o UnauthorizedException
    }

    const isPasswordValid = await this.hashComparator.compare(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('User credentials do not match'); // Desacoplar dessa camada o UnauthorizedException
    }

    const accessToken = await this.encrypter.encrypt({
      sub: user.id.toValue(),
    });

    return {
      accessToken,
    };
  }
}
