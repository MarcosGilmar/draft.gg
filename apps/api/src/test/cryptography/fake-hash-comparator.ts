import { HashComparator } from 'src/application/ports/cryptography/hash-comparator';

export class FakeHashComparator implements HashComparator {
  compare(plain: string, hashed: string): Promise<boolean> {
    return Promise.resolve(plain.concat('-hashed') === hashed);
  }
}
