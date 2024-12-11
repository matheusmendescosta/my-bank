import { ExpenseRepository } from '@/repositories/expense-repository';
import { UserRepository } from '@/repositories/user-repository';
import { Expense, TypePayment } from '@prisma/client';
import { UserNotFound } from './errors/user-not-found';

interface CreateExpenseRequest {
  name: string | null;
  value: number;
  description: string | null;
  userId: string;
  typePayment: TypePayment;
}

interface CreateExpenseResponse {
  expense: Expense;
}

export class CreateExpenseService {
  constructor(private expenseRepository: ExpenseRepository, private userRepository: UserRepository) {}

  async execute({ name, value, description, typePayment, userId }: CreateExpenseRequest): Promise<CreateExpenseResponse> {
    const user = await this.userRepository.findById(userId);

    if (!user) throw new UserNotFound();

    const expense = await this.expenseRepository.create({
      name,
      value,
      description,
      typePayment,
      userId,
    });

    return { expense };
  }
}
