import { Entity } from 'src/core/entities/entity';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import { Optional } from 'src/core/utils/optional';

export enum NoteType {
  MATCH = 'MATCH',
  MATCHUP = 'MATCHUP',
  GENERAL = 'GENERAL',
}

export interface NoteProps {
  title: string;
  content: string;
  type: NoteType;
  userId: UniqueEntityId;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class Note extends Entity<NoteProps> {
  private constructor(props: NoteProps, id?: UniqueEntityId) {
    super(props, id);
  }

  static create(
    props: Optional<NoteProps, 'createdAt'>,
    id?: UniqueEntityId,
  ): Note {
    return new Note({ ...props, createdAt: props.createdAt ?? new Date() }, id);
  }

  get title() {
    return this.props.title;
  }

  get content() {
    return this.props.content;
  }

  get type() {
    return this.props.type;
  }

  get userId() {
    return this.props.userId;
  }
}
