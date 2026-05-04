import { Note } from '../entities/note';

export abstract class NotesRepository {
  abstract create(note: Note): Promise<void>;
}
