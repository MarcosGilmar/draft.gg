import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticateUserUseCase } from 'src/domain/use-cases/authenticate-user';
import { CreateNoteUseCase } from 'src/domain/use-cases/create-note';
import { CreateUserUseCase } from 'src/domain/use-cases/create-user';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { DatabaseModule } from '../database/database.module';
import { AuthenticateController } from './controllers/authenticate-controller';
import { CreateAccountController } from './controllers/create-account.controller';
import { CreateNoteController } from './controllers/create-note.controller';
import { AuthenticateWithGoogleUseCase } from 'src/domain/use-cases/authenticate-with-google';
import { AuthenticateWithGoogle } from './controllers/authenticate-with-google-controller';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    AuthenticateWithGoogle,
    CreateNoteController,
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
  ],
})
export class HttpModule {}
