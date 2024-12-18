import { PrismaRecurringExpenseRepository } from '@/repositories/prisma/prisma-recurring-expense-repository';
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository';
import { CreateRecurringExpenseService } from '@/services/create-recurring-expense-service';
import { UserNotFound } from '@/services/errors/user-not-found';
import { Request, Response } from 'express';
import { z, ZodError } from 'zod';

const bodySchema = z.object({
  title: z.string(),
  description: z.string().nullable().optional(),
  recurringExpenseDate: z.number().min(1, 'must be greater than 1').max(31, 'must be less than 31'),
  username: z.string(),
});

export async function CreateRecurringExpenseController(request: Request, response: Response) {
  try {
    const body = bodySchema.parse(request.body);

    const recurringExpenseService = new CreateRecurringExpenseService(new PrismaRecurringExpenseRepository(), new PrismaUserRepository());

    const { recurringExpense } = await recurringExpenseService.execute(body);

    response.status(201).json({ recurringExpense });
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

    console.log('error --->', error);

    response.status(500).json({ message: 'Internal server error' });
  }
}
