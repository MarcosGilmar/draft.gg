import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcryptjs';
import { HashComparator } from 'src/domain/cryptography/hash-comparator';
import { HashGenerator } from 'src/domain/cryptography/hash-generator';

@Injectable()
export class BcryptHasher implements HashGenerator, HashComparator {
  async hash(plain: string): Promise<string> {
    return hash(plain, 8);
  }

  async compare(plain: string, hashed: string): Promise<boolean> {
    return compare(plain, hashed);
  }
}
