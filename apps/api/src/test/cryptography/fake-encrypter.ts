import { Encrypter } from 'src/application/ports/cryptography/encrypter';

export class FakeEncrypter implements Encrypter {
  encrypt(payload: Record<string, unknown>): Promise<string> {
    return Promise.resolve(JSON.stringify(payload));
  }
}
