import { SalaryRepository } from '@/repositories/salary-repository';
import { UserRepository } from '@/repositories/user-repository';
import { Salary } from '@prisma/client';
import { UserNotFound } from './errors/user-not-found';
import { UsernameSalaryExistsError } from './errors/username-salary-exists-error';
import { Decimal } from '@prisma/client/runtime/library';

interface CreateSalaryServiceResponse {
  salary: Salary;
}

interface CreateSalaryServiceRequest {
  amount: number | Decimal;
  paymentDay: number;
  username: string;
}

export class CreateSalaryService {
  constructor(private salaryRepository: SalaryRepository, private userRepository: UserRepository) {}

  async execute({ amount, paymentDay, username }: CreateSalaryServiceRequest): Promise<CreateSalaryServiceResponse> {
    const user = await this.userRepository.findByUsername(username);

    if (!user) throw new UserNotFound();

    const usernameAlreadyHasSalary = await this.salaryRepository.findByUsername(username);

    if (usernameAlreadyHasSalary) throw new UsernameSalaryExistsError();

    const salary = await this.salaryRepository.create({ amount, paymentDay, username });

    return { salary };
  }
}
