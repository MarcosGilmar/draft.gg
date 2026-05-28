import { User } from '../entities/user';

export abstract class UsersRepository {
  abstract findByEmail(email: string): Promise<User | null>;
  abstract create(user: User): Promise<void>;
  abstract saveResetCode(
    user: User,
    code: string,
    expirationTime: Date,
  ): Promise<void>;
}
