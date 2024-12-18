import { Prisma, RecurringExpense } from '@prisma/client';

export interface RecurringExpenseRepository {
  create(data: Prisma.RecurringExpenseUncheckedCreateInput): Promise<RecurringExpense>;
}
