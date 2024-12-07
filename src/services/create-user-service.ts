import { UserRepository } from "@/repositories/user-repository";
import { User } from "@prisma/client";

interface CreateUserServiceRequest {
  name: string;
  email: string;
}

interface CreateUnitServiceResponse {
  user: User;
}

export class CreateUserService {
  constructor(private userRepository: UserRepository) {}

  async execute({
    name,
    email,
  }: CreateUserServiceRequest): Promise<CreateUnitServiceResponse> {
    const user = await this.userRepository.create({
      name,
      email,
    });
    return { user };
  }
}
