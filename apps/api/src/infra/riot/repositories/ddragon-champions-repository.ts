import { Injectable } from '@nestjs/common';
import { ChampionProps } from '@repo/shared/types/champion';
import { ChampionsRepository } from 'src/domain/repositories/champion-repository';
import { DDragonVersionService } from '../services/ddragon-version.service';
import { DDragonChampion } from '../types/ddragon-types';

const DDRAGON_BASE_URL = 'https://ddragon.leagueoflegends.com';

@Injectable()
export class DDragonChampionRepository implements ChampionsRepository {
  constructor(private versionService: DDragonVersionService) {}

  async findById(id: string): Promise<ChampionProps | null> {
    const version = await this.versionService.getLatestVersion();

    const response = await fetch(
      `${DDRAGON_BASE_URL}/cdn/${version}/data/en_US/champion/${id}.json`,
    );

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as {
      data: Record<string, DDragonChampion>;
    };

    const champion = data.data[id];

    if (!champion) {
      return null;
    }

    return {
      id: champion?.id,
      name: champion?.name,
      imageUrl: `${DDRAGON_BASE_URL}/cdn/${version}/img/champion/${champion?.image.full}`,
    };
  }

  async findAll(): Promise<ChampionProps[]> {
    const version = await this.versionService.getLatestVersion();

    const response = await fetch(
      `${DDRAGON_BASE_URL}/cdn/${version}/data/en_US/champion.json`,
    );

    const data = (await response.json()) as {
      data: Record<string, DDragonChampion>;
    };

    return Object.values(data.data).map((champion) => ({
      id: champion.id,
      name: champion.name,
      imageUrl: `${DDRAGON_BASE_URL}/cdn/${version}/img/champion/${champion.image.full}`,
    }));
  }
}
