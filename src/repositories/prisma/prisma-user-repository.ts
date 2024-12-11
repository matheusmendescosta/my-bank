import { Prisma, User } from '@prisma/client';
import { UserRepository } from '../user-repository';
import { prisma } from '@/lib/prisma';
import { UserNotFound } from '@/services/errors/user-not-found';

export class PrismaUserRepository implements UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id }, include: { expenses: { orderBy: { createAt: 'desc' } } } });

    if (!user) throw new UserNotFound();

    const totalExpenses = await prisma.expense.aggregate({
      where: { userId: id },
      _sum: { value: true },
    });

    return {
      ...user,
      totalExpenses: totalExpenses._sum.value || 0,
    } as User & { totalExpenses: number };
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({ data });

    return user;
  }
}
