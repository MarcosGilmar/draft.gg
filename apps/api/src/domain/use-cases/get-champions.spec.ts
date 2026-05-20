import { ChampionProps } from '@repo/shared/types/champion';
import { FakeChampionsRepository } from 'src/test/repositories/fake-champions-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { GetChampionsUseCase } from './get-champions';

const mockChampion: ChampionProps = {
  id: 'Ahri',
  name: 'Ahri',
  imageUrl: 'https://ddragon.leagueoflegends.com/cdn/img/champion/Ahri.png',
};

describe('GetChampionsUseCase', () => {
  let fakeChampionsRepository: FakeChampionsRepository;

  let sut: GetChampionsUseCase; //System Under Test

  beforeEach(() => {
    fakeChampionsRepository = new FakeChampionsRepository();

    sut = new GetChampionsUseCase(fakeChampionsRepository);
  });

  it('should be able to fetch all champions', async () => {
    fakeChampionsRepository.items.push(mockChampion);

    const result = await sut.execute();

    expect(result.isRight()).toBe(true);
    expect(result.value).toHaveLength(1);
  });

  it('should return empty list if there are no champions', async () => {
    const result = await sut.execute();

    expect(result.isRight()).toBe(true);
    expect(result.value).toHaveLength(0);
  });
});
