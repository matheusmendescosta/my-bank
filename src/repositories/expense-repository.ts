import { Expense, Prisma } from "@prisma/client";

export interface ExpenseRepository {
    create(data: Prisma.ExpenseCreateInput): Promise<Expense>
}