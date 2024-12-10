import { Prisma, Expense } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { ExpenseRepository } from '../expense-repository';

export class PrismaExpenseRepository implements ExpenseRepository {
  async list(
    offset: number = 1,
    limit: number = 25,
    userId?: string
  ): Promise<{
    totalCount: number;
    hasMore: boolean;
    offset: number;
    limit: number;
    data: Expense[];
  }> {
    const count = await prisma.expense.count();

    const data = await prisma.expense.findMany({
      where: userId ? { userId } : {},
      take: limit,
      skip: (offset - 1) * limit,
      orderBy: {
        createAt: 'desc',
      },
    });

    const totalPages = Math.ceil(count / limit);

    const hasMore = offset < totalPages;

    return { totalCount: count, hasMore, offset, limit, data };
  }

  async create(data: Prisma.ExpenseUncheckedCreateInput): Promise<Expense> {
    const expense = await prisma.expense.create({ data });

    return expense;
  }
}
