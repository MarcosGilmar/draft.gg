import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticateUserUseCase } from 'src/application/use-cases/authenticate-user';
import { AuthenticateWithGoogleUseCase } from 'src/application/use-cases/authenticate-with-google';
import { CreateNoteUseCase } from 'src/application/use-cases/create-note';
import { CreateUserUseCase } from 'src/application/use-cases/create-user';
import { GetChampionsUseCase } from 'src/application/use-cases/get-champions';
import { GetChampionByIdUseCase } from 'src/application/use-cases/get-champions-by-id';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { DatabaseModule } from '../database/database.module';
import { RiotModule } from '../riot/riot.module';
import { AuthenticateController } from './controllers/authenticate-controller';
import { AuthenticateWithGoogle } from './controllers/authenticate-with-google-controller';
import { CreateAccountController } from './controllers/create-account.controller';
import { CreateNoteController } from './controllers/create-note.controller';
import { GetChampionsController } from './controllers/get-champions.controller';

@Module({
  imports: [DatabaseModule, CryptographyModule, RiotModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    AuthenticateWithGoogle,
    CreateNoteController,
    GetChampionsController,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    CreateUserUseCase,
    AuthenticateUserUseCase,
    AuthenticateWithGoogleUseCase,
    CreateNoteUseCase,
    GetChampionsUseCase,
    GetChampionByIdUseCase,
  ],
})
export class HttpModule {}
