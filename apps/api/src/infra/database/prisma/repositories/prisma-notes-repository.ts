import { Injectable } from '@nestjs/common';
import { Note } from 'src/domain/entities/note';
import { NotesRepository } from 'src/domain/repositories/notes-repository';
import { PrismaNoteMapper } from '../mappers/prisma-note-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNotesRepository implements NotesRepository {
  constructor(private prismaService: PrismaService) {}

  async create(note: Note): Promise<void> {
    const data = PrismaNoteMapper.toPrisma(note);

    await this.prismaService.notes.create({ data });
  }
}
