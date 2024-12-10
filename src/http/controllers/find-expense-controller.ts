import { PrismaExpenseRepository } from '@/repositories/prisma/prisma-expense-repository';
import { ListExpenseService } from '@/services/list-expense-service';
import { Request, Response } from 'express';
import { z, ZodError } from 'zod';

const searchBodySchema = z.object({
  offset: z.coerce.number().optional(),
  limit: z.coerce.number().min(1, 'Must have at least 1 item').max(100, 'must have less than 100 items').optional(),
  userId: z.string().optional(),
});

export async function FindExpenseController(request: Request, response: Response) {
  try {
    const { offset, limit, userId } = searchBodySchema.parse(request.query);

    const listExpenseService = new ListExpenseService(new PrismaExpenseRepository());
    const { expenses } = await listExpenseService.execute({
      offset,
      limit,
      userId,
    });

    return response.status(200).json(expenses);
  } catch (error) {
    if (error instanceof ZodError) {
      return response.status(400).json({
        error: 'validation error',
        details: error.errors,
      });
    }

    console.log('internal server error -> ', error);

    return response.status(500).json({ msg: 'internal server error' });
  }
}
