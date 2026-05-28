import { Module } from '@nestjs/common';
import { Encrypter } from 'src/application/ports/cryptography/encrypter';
import { HashComparator } from 'src/application/ports/cryptography/hash-comparator';
import { HashGenerator } from 'src/application/ports/cryptography/hash-generator';
import { BcryptHasher } from './bcrypt-hasher';
import { JwtEncrypter } from './jwt-encrypter';

@Module({
  providers: [
    {
      provide: HashGenerator,
      useClass: BcryptHasher,
    },
    {
      provide: HashComparator,
      useClass: BcryptHasher,
    },
    {
      provide: Encrypter,
      useClass: JwtEncrypter,
    },
  ],
  exports: [HashGenerator, HashComparator, Encrypter],
})
export class CryptographyModule {}
