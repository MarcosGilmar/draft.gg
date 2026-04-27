import { ConflictException, Injectable } from '@nestjs/common';
import { HashGenerator } from '../cryptography/hash-generator';
import { User } from '../entities/user';
import { UsersRepository } from '../repositories/users-repository';

interface CreateUserCaseInput {
  name: string;
  email: string;
  password: string;
}
@Injectable()
export class CreateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({ name, email, password }: CreateUserCaseInput): Promise<void> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new ConflictException(); //Desacoplar dessa camada o Conflict
    }

    const hashedPassword = await this.hashGenerator.hash(password);

    const user = User.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.usersRepository.create(user);
  }
}
