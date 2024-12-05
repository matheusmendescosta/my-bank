import { PrismaExpenseRepository } from "@/repositories/prisma/prisma-expense-repository";
import { ListExpenseService } from "@/services/list-expense-service";
import { Request, Response } from "express";
import { z } from "zod";

const searchBodySchema = z.object({
    page: z.coerce.number().optional(),
    totalPage: z.coerce.number().optional(),
    userId: z.string().optional()
})

export async function FindExpenseController(request: Request, response: Response) {

    const { page, totalPage, userId } = searchBodySchema.parse(request.query)

    const listExpenseService = new ListExpenseService(new PrismaExpenseRepository)

    try {
        const { expenses } = await listExpenseService.execute({ page, totalPage, userId })

        return response.status(200).json({ expenses })
    } catch (error) {
        console.log("errouuuuu -> ", error)

        return response.status(500).json({ msg: "internal server error" })
    }
}