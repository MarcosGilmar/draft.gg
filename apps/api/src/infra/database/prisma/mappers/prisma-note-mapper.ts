import { Prisma, Notes as PrismaNote } from 'generated/prisma/client';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import { Note, NoteType } from 'src/domain/entities/note';

export class PrismaNoteMapper {
  static toDomain(raw: PrismaNote): Note {
    return Note.create(
      {
        title: raw.title,
        content: raw.content,
        type: NoteType[raw.type],
        userId: new UniqueEntityId(raw.userId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toPrisma(note: Note): Prisma.NotesUncheckedCreateInput {
    return {
      id: note.id.toValue(),
      title: note.title,
      content: note.content,
      type: note.type,
      userId: note.userId.toValue(),
    };
  }
}
