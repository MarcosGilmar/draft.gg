import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import { FakeNotesRepository } from 'src/test/repositories/fake-notes-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { NoteType } from '../entities/note';
import { CreateNoteUseCase } from './create-note';

describe('CreateNoteUseCase', () => {
  let fakeNotesRepository: FakeNotesRepository;

  let sut: CreateNoteUseCase;

  beforeEach(() => {
    fakeNotesRepository = new FakeNotesRepository();

    sut = new CreateNoteUseCase(fakeNotesRepository);
  });

  it('should create a note', async () => {
    const result = await sut.execute({
      title: 'Título',
      content: 'Conteúdo',
      type: NoteType.MATCH,
      userId: new UniqueEntityId(),
    });

    expect(result.isRight()).toBe(true);
    expect(fakeNotesRepository.items).toHaveLength(1);
  });
});
