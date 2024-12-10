import { ExpenseRepository } from '@/repositories/expense-repository';
import { Expense } from '@prisma/client';

interface ListExpenseServiceRequest {
  offset?: number;
  limit?: number;
  userId?: string;
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
  constructor(private expenseRepository: ExpenseRepository) {}

  async execute({ offset, limit, userId }: ListExpenseServiceRequest): Promise<ListExpenseServiceResponse> {
    const expenses = await this.expenseRepository.list(offset, limit, userId);

    return { expenses };
  }
}
