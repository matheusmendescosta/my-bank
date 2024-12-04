import { ExpenseRepository } from "@/repositories/expense-repository";
import { Expense } from "@prisma/client";

interface CreateExpenseRequest {
    name: string,
    value: number
    description: string
}

interface CreateExpenseResponse {
    expense: Expense
}

export class CreateExpenseService {
    constructor(private expenseRepository: ExpenseRepository) { }

    async execute({ name, value, description }: CreateExpenseRequest): Promise<CreateExpenseResponse> {
        const expense = await this.expenseRepository.create({ name, value, description })

        return { expense }
    }
}