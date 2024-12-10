import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository';
import { CreateUserService } from '@/services/create-user-service';
import { userAlreadyExistsError } from '@/services/errors/user-already-exists-error';
import { Request, Response } from 'express';
import { z, ZodError } from 'zod';

const bodySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Email is required'),
});

export async function Create(request: Request, response: Response) {
  try {
    const body = bodySchema.parse(request.body);

    const createUserService = new CreateUserService(new PrismaUserRepository());
    const { user } = await createUserService.execute(body);

    return response.status(201).json({ user });
  } catch (error) {
    if (error instanceof ZodError) {
      return response.status(400).json({
        error: 'validation error',
        details: error.errors,
      });
    }

    if (error instanceof userAlreadyExistsError) {
      return response.status(409).json({ message: error.message });
    }

    return response.status(500).json({ error: 'Internal server error' });
  }
}
