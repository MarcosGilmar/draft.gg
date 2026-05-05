import { HashComparator } from 'src/domain/cryptography/hash-comparator';

export class FakeHashComparator implements HashComparator {
  compare(plain: string, hashed: string): Promise<boolean> {
    return Promise.resolve(plain.concat('-hashed') === hashed);
  }
}
