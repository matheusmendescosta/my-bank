import { ExpenseRepository } from "@/repositories/expense-repository";
import { UserRepository } from "@/repositories/user-repository";
import { Expense } from "@prisma/client";

interface CreateExpenseRequest {
    name: string,
    value: number
    description: string
    userId: string
}

interface CreateExpenseResponse {
    expense: Expense
}

export class CreateExpenseService {
    constructor(private expenseRepository: ExpenseRepository, private userRepository: UserRepository) { }

    async execute({ name, value, description, userId }: CreateExpenseRequest): Promise<CreateExpenseResponse> {
        const user = await this.userRepository.findById(userId)

        if (!user) {
            console.log("user not found")
        }

        const expense = await this.expenseRepository.create({ name, value, description, userId })

        return { expense }
    }
}