import { Expense, Prisma } from '@prisma/client';

export interface ExpenseRepository {
  create(data: Prisma.ExpenseUncheckedCreateInput): Promise<Expense>;
  list(
    offset?: number,
    limit?: number,
    username?: string
  ): Promise<{
    totalCount: number;
    hasMore: boolean;
    offset: number;
    limit: number;
    data: Expense[];
  }>;
}
