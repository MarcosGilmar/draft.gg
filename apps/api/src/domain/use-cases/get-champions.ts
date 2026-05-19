import { Injectable } from '@nestjs/common';
import { Either, right } from 'src/core/either';
import { ChampionsRepository } from '../repositories/champion-repository';
import { ChampionProps } from '@repo/shared/types/champion';

// interface GetChampionsUseCaseInput {
// }

type GetChampionsUseCaseOutput = Either<never, ChampionProps[]>;

@Injectable()
export class GetChampionsUseCase {
  constructor(private championsRepository: ChampionsRepository) {}

  async execute(): Promise<GetChampionsUseCaseOutput> {
    const champions = await this.championsRepository.findAll();

    return right(champions);
  }
}
