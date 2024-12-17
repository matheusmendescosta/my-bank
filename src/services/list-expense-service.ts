import { ExpenseRepository } from '@/repositories/expense-repository';
import { UserRepository } from '@/repositories/user-repository';
import { Expense } from '@prisma/client';
import { UserNotFound } from './errors/user-not-found';

interface ListExpenseServiceRequest {
  offset?: number;
  limit?: number;
  username?: string;
}

interface ListExpenseServiceResponse {
  expenses: {
    totalCount: number;
    offset: number;
    limit: number;
    data: Expense[];
  };
}

export class ListExpenseService {
  constructor(private expenseRepository: ExpenseRepository, private userRepository: UserRepository) {}

  async execute({ offset, limit, username }: ListExpenseServiceRequest): Promise<ListExpenseServiceResponse> {
    const expenses = await this.expenseRepository.list(offset, limit, username);

    return { expenses };
  }
}
