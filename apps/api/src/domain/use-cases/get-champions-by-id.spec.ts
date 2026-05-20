import { ChampionProps } from '@repo/shared/types/champion';
import { FakeChampionsRepository } from 'src/test/repositories/fake-champions-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { ChampionNotFound } from '../errors/champion-not-found-error';
import { GetChampionByIdUseCase } from './get-champions-by-id';

const mockChampion: ChampionProps = {
  id: 'Ahri',
  name: 'Ahri',
  imageUrl: 'https://ddragon.leagueoflegends.com/cdn/img/champion/Ahri.png',
};

describe('GetChampionsByIdUseCase', () => {
  let fakeChampionsRepository: FakeChampionsRepository;

  let sut: GetChampionByIdUseCase; //System Under Test

  beforeEach(() => {
    fakeChampionsRepository = new FakeChampionsRepository();

    sut = new GetChampionByIdUseCase(fakeChampionsRepository);
  });

  it('should be able to fetch a champion by id', async () => {
    fakeChampionsRepository.items.push(mockChampion);

    const result = await sut.execute({ id: 'Ahri' });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual(mockChampion);
  });

  it('should return ChampionNotFound when champion does not exist', async () => {
    const result = await sut.execute({ id: 'Invalid' });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ChampionNotFound);
  });
});
