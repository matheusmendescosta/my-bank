import { Prisma, Salary } from '@prisma/client';
import { SalaryRepository } from '../salary-repository';
import { prisma } from '@/lib/prisma';

export class PrismaSalaryRepository implements SalaryRepository {
  async create(data: Prisma.SalaryUncheckedCreateInput): Promise<Salary> {
    const salary = await prisma.salary.create({ data });

    return salary;
  }
}
