import { ChampionProps } from '@repo/shared/types/champion';
import { Either, left, right } from 'src/core/either';
import { ChampionsRepository } from '../repositories/champion-repository';
import { ChampionNotFound } from '../errors/champion-not-found-error';
import { Injectable } from '@nestjs/common';

interface GetChampionByIdUseCaseInput {
  id: string;
}

type GetChampionByIdUseCaseOutput = Either<ChampionNotFound, ChampionProps>;

@Injectable()
export class GetChampionByIdUseCase {
  constructor(private championsRepository: ChampionsRepository) {}

  async execute({
    id,
  }: GetChampionByIdUseCaseInput): Promise<GetChampionByIdUseCaseOutput> {
    const champion = await this.championsRepository.findById(id);

    if (!champion) {
      return left(new ChampionNotFound());
    }

    return right(champion);
  }
}
