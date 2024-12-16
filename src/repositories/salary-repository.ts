import { Prisma, Salary } from '@prisma/client';

export interface SalaryRepository {
  create(data: Prisma.SalaryUncheckedCreateInput): Promise<Salary>;
}
