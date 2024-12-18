import { GetUserService } from './get-user-service';
import { UserRepository } from '../repositories/user-repository';
import { User } from '@prisma/client';
import { UserNotFound } from './errors/user-not-found';

describe('check user exist', () => {
  let userRepository: UserRepository;
  let getUserService: GetUserService;

  beforeEach(() => {
    userRepository = {
      findById: jest.fn(),
    } as unknown as UserRepository;

    getUserService = new GetUserService(userRepository);
  });

  it('return user with id valid', async () => {
    const user: User = {
      id: '123',
      name: 'John Doe',
      email: 'johndoe@example.com',
      username: 'johnDoe',
      createdAt: new Date(),
    };

    jest.spyOn(userRepository, 'findById').mockResolvedValueOnce(user);

    const response = await getUserService.execute({ id: '123' });

    expect(response.user).toEqual(user);
    expect(userRepository.findById).toHaveBeenCalledWith('123');
    expect(userRepository.findById).toHaveBeenCalledTimes(1);
  });

  it('return error with user id invalid', async () => {
    jest.spyOn(userRepository, 'findById').mockResolvedValueOnce(null);

    await expect(getUserService.execute({ id: '123' })).rejects.toThrow(UserNotFound);
    expect(userRepository.findById).toHaveBeenCalledWith('123');
    expect(userRepository.findById).toHaveBeenCalledTimes(1);
  });
});
