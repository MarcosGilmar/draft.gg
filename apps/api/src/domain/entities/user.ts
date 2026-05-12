import { Entity } from 'src/core/entities/entity';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import { Optional } from 'src/core/utils/optional';

export interface UserProps {
  name: string;
  email: string;
  password: string | null;
  avatar: string | null;
  createdAt: Date;
}

export class User extends Entity<UserProps> {
  private constructor(props: UserProps, id?: UniqueEntityId) {
    super(props, id);
  }

  static create(
    props: Optional<UserProps, 'createdAt' | 'avatar' | 'password'>,
    id?: UniqueEntityId,
  ): User {
    return new User(
      {
        ...props,
        password: props.password ?? null,
        avatar: props.avatar ?? null,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
  }

  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  get avatar() {
    return this.props.avatar;
  }

  get createdAt() {
    return this.props.createdAt;
  }
}
