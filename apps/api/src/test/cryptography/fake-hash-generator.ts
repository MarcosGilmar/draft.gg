import { HashGenerator } from 'src/domain/cryptography/hash-generator';

export class FakeHashGenerator implements HashGenerator {
  hash(plain: string): Promise<string> {
    return Promise.resolve(plain.concat('-hashed'));
  }
}
