import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { CreateUserService } from "@/services/create-user-service";
import { Request, Response } from "express";
import { z } from "zod";

const bodySchema = z.object({
    name: z.string().min(1, 'require'),
    email: z.string().email('This is not a valid email ')
})

export async function Create(request: Request, response: Response) {
    const body = bodySchema.parse(request.body)

    const createUserService = new CreateUserService(new PrismaUserRepository)

    try {
        const { user } = await createUserService.execute(body)

        return response.status(201).json({ user })
    } catch (error) {
        console.log(error)

        return response.status(500).json({ error: "Internal server error" })
    }
}