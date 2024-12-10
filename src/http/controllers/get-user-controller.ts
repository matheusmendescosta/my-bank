import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository';
import { UserNotFound } from '@/services/errors/user-not-found';
import { GetUserService } from '@/services/get-user-service';
import { Request, Response } from 'express';
import { z } from 'zod';

const routeSchema = z.object({
  id: z.string(),
});

export async function GetUserController(request: Request, response: Response) {
  try {
    const { id } = routeSchema.parse(request.params);

    const getUserService = new GetUserService(new PrismaUserRepository());

    const { user } = await getUserService.execute({ id });

    return response.status(200).json(user);
  } catch (error) {
    if (error instanceof UserNotFound) {
      return response.status(404).json({ message: error.message });
    }

    return response.status(500).json({ message: 'Internal server error' });
  }
}
