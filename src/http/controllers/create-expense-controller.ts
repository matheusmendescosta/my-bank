import { PrismaExpenseRepository } from '@/repositories/prisma/prisma-expense-repository';
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository';
import { CreateExpenseService } from '@/services/create-expense-service';
import { UserNotFound } from '@/services/errors/user-not-found';
import { TypePayment } from '@prisma/client';
import { Request, Response } from 'express';
import { z, ZodError } from 'zod';

const bodySchema = z.object({
  location: z.string().nullable(),
  amount: z.number().min(1, 'value is required'),
  description: z.string().nullable(),
  typePayment: z.nativeEnum(TypePayment),
  username: z.string(),
});

export async function CreateExpense(request: Request, response: Response) {
  try {
    const body = bodySchema.parse(request.body);

    const createExpenseService = new CreateExpenseService(new PrismaExpenseRepository(), new PrismaUserRepository());

    const { expense } = await createExpenseService.execute(body);

    return response.status(201).json({ expense });
  } catch (error) {
    if (error instanceof UserNotFound) {
      return response.status(404).json({ message: error.message });
    }

    if (error instanceof ZodError) {
      return response.status(400).json({
        error: 'validation error',
        details: error.errors,
      });
    }
    console.log('error --------> ', error);
    return response.status(500).json({ error: 'internal server error' });
  }
}
