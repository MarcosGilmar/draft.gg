import { ConflictException, Injectable } from '@nestjs/common';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import { Subject } from '../entities/subject';
import { SubjectsRepository } from '../repositories/subjects-repository';

interface CreateSubjectUseCaseInput {
  name: string;
  userId: UniqueEntityId;
}

@Injectable()
export class CreateSubjectUseCase {
  constructor(private subjectsRepository: SubjectsRepository) {}

  async execute({ name, userId }: CreateSubjectUseCaseInput) {
    const subjectWithSameName =
      await this.subjectsRepository.findWithSameName(name);

    if (subjectWithSameName) {
      throw new ConflictException('Subjects with the same name'); //Desacoplar dessa camada o Conflict
    }

    const subject = Subject.create({
      name,
      userId,
    });

    await this.subjectsRepository.create(subject);
  }
}
