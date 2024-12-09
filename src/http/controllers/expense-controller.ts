import { PrismaExpenseRepository } from "@/repositories/prisma/prisma-expense-repository";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { CreateExpenseService } from "@/services/create-expense-service";
import { Request, Response } from "express";
import { z, ZodError } from "zod";

const bodySchema = z.object({
  name: z.string().nullable(),
  value: z.number().min(1, "value is required"),
  description: z.string().nullable(),
  userId: z.string(),
});

export async function CreateExpense(request: Request, response: Response) {
  const body = bodySchema.parse(request.body);

  const createExpenseService = new CreateExpenseService(
    new PrismaExpenseRepository(),
    new PrismaUserRepository()
  );

  try {
    const { expense } = await createExpenseService.execute(body);

    return response.status(201).json({ expense });
  } catch (error) {
    if (error instanceof ZodError) {
      return response.status(400).json({
        error: "validation error",
        details: error.errors,
      });
    }

    return response.status(500).json({ error: "internal server error" });
  }
}
