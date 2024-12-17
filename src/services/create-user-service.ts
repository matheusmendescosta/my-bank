import { UserRepository } from '@/repositories/user-repository';
import { User } from '@prisma/client';
import { userAlreadyExistsError } from './errors/user-already-exists-error';
import { UsernameAlreadyExistsError } from './errors/username-already-exists-error';

interface CreateUserServiceRequest {
  name: string;
  email: string;
  username: string;
}

interface CreateUnitServiceResponse {
  user: User;
}

export class CreateUserService {
  constructor(private userRepository: UserRepository) {}

  async execute({ name, email, username }: CreateUserServiceRequest): Promise<CreateUnitServiceResponse> {
    const userWithSameEmail = await this.userRepository.findByEmail(email);
    const userWithSameUsername = await this.userRepository.findByUsername(username);

    if (userWithSameUsername) throw new UsernameAlreadyExistsError();

    if (userWithSameEmail) throw new userAlreadyExistsError();

    const user = await this.userRepository.create({
      name,
      email,
      username,
    });
    return { user };
  }
}
