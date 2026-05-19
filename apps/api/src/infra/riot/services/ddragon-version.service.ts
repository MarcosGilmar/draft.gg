import { Injectable } from '@nestjs/common';

@Injectable()
export class DDragonVersionService {
  private latestVersion: string | null = null;

  async getLatestVersion(): Promise<string> {
    const result = await fetch(
      'https://ddragon.leagueoflegends.com/api/versions.json',
    );

    const version = (await result.json()) as string[];

    //se der problema validar latestVersion
    this.latestVersion = version[0]!;
    return this.latestVersion;
  }
}
