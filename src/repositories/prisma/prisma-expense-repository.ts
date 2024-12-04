import { Prisma, Expense } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ExpenseRepository } from "../expense-repository";


export class PrismaExpenseRepository implements ExpenseRepository {
    async create(data: Prisma.ExpenseUncheckedCreateInput): Promise<Expense> {
        const expense = await prisma.expense.create({ data })

        return expense
    }

}