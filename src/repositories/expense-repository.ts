import { Expense, Prisma } from "@prisma/client";

export interface ExpenseRepository {
    create(data: Prisma.ExpenseUncheckedCreateInput): Promise<Expense>
    list(page?: number, totalPage?: number, userId?: string): Promise<Expense[]>
}