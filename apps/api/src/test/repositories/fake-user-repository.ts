import { User } from 'src/domain/entities/user';
import { UsersRepository } from 'src/domain/repositories/users-repository';

export class FakeUserRepository implements UsersRepository {
  public items: User[] = [];

  findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((user) => user.email === email);

    return Promise.resolve(user ?? null);
  }

  create(user: User): Promise<void> {
    this.items.push(user);

    return Promise.resolve();
  }
}
