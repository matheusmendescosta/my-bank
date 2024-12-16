import { PrismaSalaryRepository } from '@/repositories/prisma/prisma-salary-repository';
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository';
import { CreateSalaryService } from '@/services/create-salary-service';
import { Request, Response } from 'express';
import { z } from 'zod';

const bodySchema = z.object({
  amount: z.number(),
  PaymentDay: z.string().date(),
  userId: z.string(),
});

export async function CreateSalary(request: Request, response: Response) {
  try {
    const body = bodySchema.parse(request.body);
    const createSalaryService = new CreateSalaryService(new PrismaSalaryRepository(), new PrismaUserRepository());
    const { salary } = await createSalaryService.execute(body);

    return response.status(201).json({ salary });
  } catch (error) {
    console.log('error ======>', error);
    return response.status(500).json({ message: 'Internal server error' });
  }
}
