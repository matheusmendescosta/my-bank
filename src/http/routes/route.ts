import { Router } from 'express';
import { Create } from '../controllers/create-user-controller';
import { CreateExpense } from '../controllers/create-expense-controller';
import { FindExpenseController } from '../controllers/list-expense-controller';
import { GetUserController } from '../controllers/get-user-controller';
import { CreateSalary } from '../controllers/create-salary-controller';
import { CreateRecurringExpenseController } from '../controllers/create-recurring-expense-controller';

const route = Router();

route.post('/user', (request, response) => Create(request, response));
route.get('/user/:id', (request, response) => GetUserController(request, response));

route.post('/expense', (request, response) => CreateExpense(request, response));
route.get('/expense', (request, response) => FindExpenseController(request, response));

route.post('/salary', (request, response) => CreateSalary(request, response));

route.post('/recurringExpense', (request, response) => CreateRecurringExpenseController(request, response));

export default route;
