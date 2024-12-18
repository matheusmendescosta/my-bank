import { CreateUserService } from './create-user-service';
import { UserRepository } from '../repositories/user-repository';
import { UsernameAlreadyExistsError } from './errors/username-already-exists-error';
import { userAlreadyExistsError } from './errors/user-already-exists-error';
import { User } from '@prisma/client';

describe('CreateUserService', () => {
  let userRepository: jest.Mocked<UserRepository>;
  let createUserService: CreateUserService;

  beforeEach(() => {
    userRepository = {
      create: jest.fn(),
      findByEmail: jest.fn(),
      findByUsername: jest.fn(),
      findById: jest.fn(),
    };
    createUserService = new CreateUserService(userRepository);
  });

  it('should create a user successfully create', async () => {
    const user: User = {
      id: '123',
      name: 'John Doe',
      email: 'johndoe@example.com',
      username: 'johnDoe',
      createdAt: new Date(),
    };

    userRepository.findByEmail.mockResolvedValue(null);
    userRepository.findByUsername.mockResolvedValue(null);
    userRepository.create.mockResolvedValue(user);

    const result = await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      username: 'johnDoe',
    });

    expect(result.user).toEqual(user);
    expect(userRepository.findByEmail).toHaveBeenCalledWith('johndoe@example.com');
    expect(userRepository.findByUsername).toHaveBeenCalledWith('johnDoe');
    expect(userRepository.create).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'johndoe@example.com',
      username: 'johnDoe',
    });
  });

  it('should throw an error if the email is already in use', async () => {
    const existingUser: User = {
      id: '124',
      name: 'Existing User',
      email: 'johndoe@example.com',
      username: 'existingUser',
      createdAt: new Date(),
    };

    userRepository.findByEmail.mockResolvedValue(existingUser);
    userRepository.findByUsername.mockResolvedValue(null);

    await expect(
      createUserService.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        username: 'johnDoe',
      })
    ).rejects.toThrow(userAlreadyExistsError);

    expect(userRepository.findByEmail).toHaveBeenCalledWith('johndoe@example.com');
    expect(userRepository.findByUsername).toHaveBeenCalledWith('johnDoe');
    expect(userRepository.create).not.toHaveBeenCalled();
  });

  it('should throw an error if the username is already in use', async () => {
    const existingUser: User = {
      id: '125',
      name: 'Another User',
      email: 'another@example.com',
      username: 'johnDoe',
      createdAt: new Date(),
    };

    userRepository.findByEmail.mockResolvedValue(null);
    userRepository.findByUsername.mockResolvedValue(existingUser);

    await expect(
      createUserService.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        username: 'johnDoe',
      })
    ).rejects.toThrow(UsernameAlreadyExistsError);

    expect(userRepository.findByEmail).toHaveBeenCalledWith('johndoe@example.com');
    expect(userRepository.findByUsername).toHaveBeenCalledWith('johnDoe');
    expect(userRepository.create).not.toHaveBeenCalled();
  });
});
