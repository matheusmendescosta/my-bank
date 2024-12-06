import { Expense, Prisma } from "@prisma/client";

export interface ExpenseRepository {
    create(data: Prisma.ExpenseUncheckedCreateInput): Promise<Expense>
    list(offset?: number, limit?: number, userId?: string): Promise<{ totalCount: number, offset: number, limit: number, data: Expense[] }>
}