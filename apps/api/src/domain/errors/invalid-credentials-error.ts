export class InvalidCredentialsError extends Error {
  constructor() {
    super('Credenciais inválidas. Tente novamente');
    this.name = 'InvalidCredentialsError';
  }
}
