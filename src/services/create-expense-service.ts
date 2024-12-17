import { ExpenseRepository } from '@/repositories/expense-repository';
import { UserRepository } from '@/repositories/user-repository';
import { Expense, TypePayment } from '@prisma/client';
import { UserNotFound } from './errors/user-not-found';

interface CreateExpenseRequest {
  location: string | null;
  amount: number;
  description: string | null;
  username: string;
  typePayment: TypePayment;
}

interface CreateExpenseResponse {
  expense: Expense;
}

export class CreateExpenseService {
  constructor(private expenseRepository: ExpenseRepository, private userRepository: UserRepository) {}

  async execute({ location, amount, description, typePayment, username }: CreateExpenseRequest): Promise<CreateExpenseResponse> {
    const user = await this.userRepository.findByUsername(username);

    if (!user) throw new UserNotFound();

    const expense = await this.expenseRepository.create({
      location,
      amount,
      description,
      typePayment,
      username,
    });

    return { expense };
  }
}
