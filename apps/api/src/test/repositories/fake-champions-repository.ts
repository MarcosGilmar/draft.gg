import { ChampionProps } from '@repo/shared/types/champion';
import { ChampionsRepository } from 'src/domain/repositories/champion-repository';

export class FakeChampionsRepository implements ChampionsRepository {
  public items: ChampionProps[] = [];

  findAll(): Promise<ChampionProps[]> {
    return Promise.resolve(this.items);
  }

  findById(id: string): Promise<ChampionProps | null> {
    const champion = this.items.find((champion) => champion.id === id);

    if (!champion) {
      return Promise.resolve(null);
    }

    return Promise.resolve(champion);
  }
}
