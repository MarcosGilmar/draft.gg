export class ChampionNotFound extends Error {
  constructor() {
    super('Não foi possível encontrar o campeão');
    this.name = 'ChampionNotFound';
  }
}
