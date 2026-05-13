export class UserAlreadyExistsError extends Error {
  constructor() {
    super('Erro ao processar cadastro. Tente novamente');
    this.name = 'UserAlreadyExistsError';
  }
}
