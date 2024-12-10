import { UserRepository } from '@/repositories/user-repository';
import { User } from '@prisma/client';
import { UserNotFound } from './errors/user-not-found';

interface GetUserServiceRequest {
  id: string;
}

interface GetUserServiceResponse {
  user: User | null;
}

export class GetUserService {
  constructor(private userRepository: UserRepository) {}

  async execute({ id }: GetUserServiceRequest): Promise<GetUserServiceResponse> {
    const user = await this.userRepository.findById(id);

    if (!user) throw new UserNotFound();

    return { user };
  }
}
