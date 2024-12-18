import { PrismaSalaryRepository } from '@/repositories/prisma/prisma-salary-repository';
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository';
import { CreateSalaryService } from '@/services/create-salary-service';
import { UserNotFound } from '@/services/errors/user-not-found';
import { UsernameSalaryExistsError } from '@/services/errors/username-salary-exists-error';
import { Request, Response } from 'express';
import { z, ZodError } from 'zod';

const bodySchema = z.object({
  amount: z.number(),
  paymentDay: z.number().min(1, 'must be greater than 1').max(31, 'must be less than 31'),
  username: z.string(),
});

export async function CreateSalary(request: Request, response: Response) {
  try {
    const body = bodySchema.parse(request.body);
    const createSalaryService = new CreateSalaryService(new PrismaSalaryRepository(), new PrismaUserRepository());
    const { salary } = await createSalaryService.execute(body);

    return response.status(201).json({ salary });
  } catch (error) {
    if (error instanceof UserNotFound) {
      return response.status(404).json({ message: error.message });
    }

    if (error instanceof UsernameSalaryExistsError) {
      return response.status(409).json({ message: error.message });
    }

    if (error instanceof ZodError) {
      return response.status(400).json({ details: error.errors });
    }

    return response.status(500).json({ message: 'Internal server error' });
  }
}
