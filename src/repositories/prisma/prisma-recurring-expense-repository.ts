import { Prisma, RecurringExpense } from '@prisma/client';
import { RecurringExpenseRepository } from '../recurring-expense-repository';
import { prisma } from '@/lib/prisma';

export class PrismaRecurringExpenseRepository implements RecurringExpenseRepository {
  create(data: Prisma.RecurringExpenseUncheckedCreateInput): Promise<RecurringExpense> {
    const recurringExpense = prisma.recurringExpense.create({ data });

    return recurringExpense;
  }
}
