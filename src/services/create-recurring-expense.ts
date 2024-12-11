import { RecurringExpense } from '@prisma/client';

interface CreateRecurringExpenseRequest {
  RecurringExpenseDate: string;
  userId: string;
}

interface CreateRecurringExpenseResponse {
  recurringExpense: RecurringExpense;
}

export class CreateRecurringExpense {
  constructor() {}

  async execute() {}
}
