import { Router } from 'express';
import { Create } from '../controllers/user-controller';
import { CreateExpense } from '../controllers/expense-controller';
import { FindExpenseController } from '../controllers/find-expense-controller';
import { GetUserController } from '../controllers/get-user-controller';
import { CreateSalary } from '../controllers/create-salary-controller';

const route = Router();

route.post('/user', (request, response) => Create(request, response));
route.post('/expense', (request, response) => CreateExpense(request, response));
route.get('/expense', (request, response) => FindExpenseController(request, response));
route.get('/user/:id', (request, response) => GetUserController(request, response));

route.post('/salary', (request, response) => CreateSalary(request, response));

export default route;
