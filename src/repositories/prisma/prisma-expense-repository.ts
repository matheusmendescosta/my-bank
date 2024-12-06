import { Prisma, Expense } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ExpenseRepository } from "../expense-repository";


export class PrismaExpenseRepository implements ExpenseRepository {
    async list(page: number = 1, totalPage: number = 2, userId?: string): Promise<{ totalCount: number, data: Expense[] }> {
        const count = await prisma.expense.count()

        const data = await prisma.expense.findMany({
            where: userId ? { userId } : {},
            take: totalPage,
            skip: (page - 1) * totalPage,
            orderBy: {
                createAt: 'desc'
            }
        })

        return { totalCount: count, data }
    }


    async create(data: Prisma.ExpenseUncheckedCreateInput): Promise<Expense> {
        const expense = await prisma.expense.create({ data })

        return expense
    }

}