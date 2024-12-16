import { SalaryRepository } from '@/repositories/salary-repository';
import { UserRepository } from '@/repositories/user-repository';
import { Salary } from '@prisma/client';
import { UserNotFound } from './errors/user-not-found';

interface CreateSalaryServiceResponse {
  salary: Salary;
}

interface CreateSalaryServiceRequest {
  amount: number;
  PaymentDay: string;
  userId: string;
}

export class CreateSalaryService {
  constructor(private salaryRepository: SalaryRepository, private userRepository: UserRepository) {}

  async execute({ amount, PaymentDay, userId }: CreateSalaryServiceRequest): Promise<CreateSalaryServiceResponse> {
    const user = await this.userRepository.findById(userId);

    if (!user) throw new UserNotFound();

    const salary = await this.salaryRepository.create({ amount, PaymentDay, userId });

    return { salary };
  }
}
