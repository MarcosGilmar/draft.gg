import { Module } from '@nestjs/common';
import { SubjectsRepository } from 'src/domain/repositories/subjects-repository';
import { UsersRepository } from 'src/domain/repositories/users-repository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaSubjectsRepository } from './prisma/repositories/prisma-subjects-repository';
import { PrismaUsersRepository } from './prisma/repositories/prisma-users-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: SubjectsRepository,
      useClass: PrismaSubjectsRepository,
    },
  ],
  exports: [UsersRepository, SubjectsRepository],
})
export class DatabaseModule {}
