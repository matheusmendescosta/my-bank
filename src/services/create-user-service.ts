import { UserRepository } from '@/repositories/user-repository';
import { User } from '@prisma/client';
import { userAlreadyExistsError } from './errors/user-already-exists-error';

interface CreateUserServiceRequest {
  name: string;
  email: string;
}

interface CreateUnitServiceResponse {
  user: User;
}

export class CreateUserService {
  constructor(private userRepository: UserRepository) {}

  async execute({ name, email }: CreateUserServiceRequest): Promise<CreateUnitServiceResponse> {
    const userWithSameEmail = await this.userRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new userAlreadyExistsError();
    }

    const user = await this.userRepository.create({
      name,
      email,
    });
    return { user };
  }
}
