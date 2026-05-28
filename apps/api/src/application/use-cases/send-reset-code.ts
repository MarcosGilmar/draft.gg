import { Injectable } from '@nestjs/common';
import { Either, right } from 'src/core/either';
import { UsersRepository } from '../../domain/repositories/users-repository';
import { HashGenerator } from '../ports/cryptography/hash-generator';
import { ResetCodeGenerator } from '../ports/cryptography/reset-code-generator';

interface SendResetCodeUseCaseInput {
  email: string;
}

type SendResetCodeUseCaseOutput = Either<void, void>;

@Injectable()
export class SendResetCodeUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private codeGenerator: ResetCodeGenerator,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    email,
  }: SendResetCodeUseCaseInput): Promise<SendResetCodeUseCaseOutput> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      //avoid users enumeration
      return right(undefined);
    }

    const code = this.codeGenerator.generateCode();

    const hashedCode = await this.hashGenerator.hash(code);

    const expirationTime = new Date(Date.now() * 1000 * 60 * 15);

    await this.usersRepository.saveResetCode(user, hashedCode, expirationTime);

    //implementação para enviar para o email

    return right(undefined);
  }
}
