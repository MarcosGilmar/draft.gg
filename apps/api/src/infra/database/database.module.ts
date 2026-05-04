import { Module } from '@nestjs/common';
import { NotesRepository } from 'src/domain/repositories/notes-repository';
import { UsersRepository } from 'src/domain/repositories/users-repository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaNotesRepository } from './prisma/repositories/prisma-notes-repository';
import { PrismaUsersRepository } from './prisma/repositories/prisma-users-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: NotesRepository,
      useClass: PrismaNotesRepository,
    },
  ],
  exports: [UsersRepository, NotesRepository],
})
export class DatabaseModule {}
