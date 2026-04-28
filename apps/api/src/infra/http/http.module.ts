import { Module } from '@nestjs/common';
import { AuthenticateUserUseCase } from 'src/domain/use-cases/authenticate-user';
import { CreateSubjectUseCase } from 'src/domain/use-cases/create-subject';
import { CreateUserUseCase } from 'src/domain/use-cases/create-user';
import { DatabaseModule } from '../database/database.module';
import { AuthenticateController } from './controllers/authenticate-controller';
import { CreateAccountController } from './controllers/create-account.controller';
import { CreateSubjectController } from './controllers/create-subject.controller';
import { CryptographyModule } from '../cryptography/cryptography.module';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateSubjectController,
  ],
  providers: [CreateUserUseCase, CreateSubjectUseCase, AuthenticateUserUseCase],
})
export class HttpModule {}
