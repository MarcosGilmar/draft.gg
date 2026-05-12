import { Prisma, Users as PrismaUser } from 'generated/prisma/client';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import { User } from 'src/domain/entities/user';

export class PrismaUserMapper {
  static toDomain(raw: PrismaUser): User {
    return User.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        avatar: raw.avatar,
        createdAt: raw.createdAt,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toPrisma(user: User): Prisma.UsersUncheckedCreateInput {
    return {
      id: user.id.toValue(),
      name: user.name,
      email: user.email,
      password: user.password,
      avatar: user.avatar,
    };
  }
}
