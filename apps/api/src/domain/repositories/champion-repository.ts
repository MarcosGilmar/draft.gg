import { ChampionProps } from '@repo/shared/types/champion';

export abstract class ChampionsRepository {
  abstract findById(id: string): Promise<ChampionProps | null>;
  abstract findAll(): Promise<ChampionProps[]>;
}
