import { Prisma, User } from '@prisma/client';
import { UserRepository } from '../user-repository';
import { prisma } from '@/lib/prisma';
import { UserNotFound } from '@/services/errors/user-not-found';

export class PrismaUserRepository implements UserRepository {
  async findByUsername(username: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    return user;
  }
  
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
      where: { username: id },
      _sum: { amount: true },
    });

    return {
      ...user,
      totalExpenses: totalExpenses._sum.amount || 0,
    } as User & { totalExpenses: number };
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({ data });

    return user;
  }
}
