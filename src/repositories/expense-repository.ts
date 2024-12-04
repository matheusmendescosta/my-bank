import { Expense, Prisma } from "@prisma/client";

export interface ExpenseRepository {
    create(data: Prisma.ExpenseUncheckedCreateInput): Promise<Expense>
}