import { ExpenseRepository } from "@/repositories/expense-repository";
import { Expense } from "@prisma/client";


interface ListExpenseServiceRequest {
    page?: number
    totalPage?: number
    userId?: string
}

interface ListExpenseServiceResponse {
    expenses: Expense[]
}

export class ListExpenseService {
    constructor(private expenseRepository: ExpenseRepository) { }

    async execute({ page, totalPage, userId }: ListExpenseServiceRequest): Promise<ListExpenseServiceResponse> {

        const expenses = await this.expenseRepository.list(page, totalPage, userId)

        return { expenses }
    }
}