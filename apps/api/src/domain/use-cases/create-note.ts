import { Injectable } from '@nestjs/common';
import { Either, right } from 'src/core/either';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import { Note, NoteType } from '../entities/note';
import { NotesRepository } from '../repositories/notes-repository';

interface CreateNoteUseCaseInput {
  title: string;
  content: string;
  type: NoteType;
  userId: UniqueEntityId;
}

type CreateNoteUseCaseOutput = Either<never, void>;

@Injectable()
export class CreateNoteUseCase {
  constructor(private notesRepository: NotesRepository) {}

  async execute({
    title,
    content,
    type,
    userId,
  }: CreateNoteUseCaseInput): Promise<CreateNoteUseCaseOutput> {
    const note = Note.create({
      title,
      content,
      type,
      userId,
    });

    await this.notesRepository.create(note);

    return right(undefined);
  }
}
