import { FakeEncrypter } from 'src/test/cryptography/fake-encrypter';
import { FakeUserRepository } from 'src/test/repositories/fake-user-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { User } from '../entities/user';
import { AuthenticateWithGoogleUseCase } from './authenticate-with-google';

describe('AuthenticateWithGoogleUseCase', () => {
  let fakeUserRepository: FakeUserRepository;
  let fakeEncrypter: FakeEncrypter;

  let sut: AuthenticateWithGoogleUseCase;

  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeEncrypter = new FakeEncrypter();

    sut = new AuthenticateWithGoogleUseCase(fakeUserRepository, fakeEncrypter);
  });

  it('should authenticate an existing user with google', async () => {
    fakeUserRepository.items.push(
      User.create({
        name: 'John Doe',
        email: 'johndoe@email.com',
        password: null,
      }),
    );

    const result = await sut.execute({
      email: 'johndoe@email.com',
      name: 'John Doe',
      avatar: 'avatar.png',
    });

    expect(result.isRight()).toBe(true);
  });

  it('should create a new user if it does not exists and authenticate', async () => {
    const result = await sut.execute({
      email: 'johndoe@email.com',
      name: 'John Doe',
      avatar: 'avatar.png',
    });

    expect(result.isRight()).toBe(true);
    expect(fakeUserRepository.items).toHaveLength(1);
    expect(fakeUserRepository.items[0]?.email).toBe('johndoe@email.com');
    expect(fakeUserRepository.items[0]?.password).toBeNull();
  });

  it('should authenticate without avatar', async () => {
    const result = await sut.execute({
      email: 'johndoe@email.com',
      name: 'John Doe',
    });

    expect(result.isRight()).toBe(true);
    expect(fakeUserRepository.items[0]?.avatar).toBeNull();
  });

  it('should not create duplicate users if user already exists', async () => {
    fakeUserRepository.items.push(
      User.create({
        name: 'John Doe',
        email: 'johndoe@email.com',
        password: null,
      }),
    );

    await sut.execute({
      email: 'johndoe@email.com',
      name: 'John Doe',
    });

    expect(fakeUserRepository.items).toHaveLength(1);
  });
});
