import { Note } from 'src/domain/entities/note';
import { NotesRepository } from 'src/domain/repositories/notes-repository';

export class FakeNotesRepository implements NotesRepository {
  public items: Note[] = [];

  create(note: Note): Promise<void> {
    this.items.push(note);

    return Promise.resolve();
  }
}
