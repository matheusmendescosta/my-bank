import { prisma } from '@/lib/prisma';
import { Prisma, User } from '@prisma/client';
import { UserRepository } from '../user-repository';

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

    return user;
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({ data });

    return user;
  }
}
