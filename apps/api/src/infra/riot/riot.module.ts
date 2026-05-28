import { Module } from '@nestjs/common';
import { ChampionsRepository } from 'src/application/ports/riot/champion-repository';
import { DDragonChampionRepository } from './repositories/ddragon-champions-repository';
import { DDragonVersionService } from './services/ddragon-version.service';

@Module({
  providers: [
    DDragonVersionService,
    {
      provide: ChampionsRepository,
      useClass: DDragonChampionRepository,
    },
  ],
  exports: [ChampionsRepository],
})
export class RiotModule {}
