import { RecurringExpenseRepository } from '@/repositories/recurring-expense-repository';
import { UserRepository } from '@/repositories/user-repository';
import { RecurringExpense } from '@prisma/client';
import { UserNotFound } from './errors/user-not-found';

interface CreateRecurringExpenseRequest {
  title: string;
  description?: string | null;
  recurringExpenseDate: number;
  username: string;
}

interface CreateRecurringExpenseResponse {
  recurringExpense: RecurringExpense;
}

export class CreateRecurringExpenseService {
  constructor(private recurringExpenseRepository: RecurringExpenseRepository, private userRepository: UserRepository) {}

  async execute({
    title,
    description,
    recurringExpenseDate,
    username,
  }: CreateRecurringExpenseRequest): Promise<CreateRecurringExpenseResponse> {
    const user = await this.userRepository.findByUsername(username);

    if (!user) throw new UserNotFound();

    const recurringExpense = await this.recurringExpenseRepository.create({ title, description, recurringExpenseDate, username });

    return { recurringExpense };
  }
}
