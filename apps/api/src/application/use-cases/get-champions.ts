import { Injectable } from '@nestjs/common';
import { ChampionProps } from '@repo/shared/types/champion';
import { Either, right } from 'src/core/either';
import { ChampionsRepository } from '../ports/riot/champion-repository';

type GetChampionsUseCaseOutput = Either<never, ChampionProps[]>;

@Injectable()
export class GetChampionsUseCase {
  constructor(private championsRepository: ChampionsRepository) {}

  async execute(): Promise<GetChampionsUseCaseOutput> {
    const champions = await this.championsRepository.findAll();

    return right(champions);
  }
}
