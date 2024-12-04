import { Router } from "express";
import { Create } from "../controllers/user-controller";
import { CreateExpense } from "../controllers/expense-controller"

const route = Router();

route.post("/user", (request, response) => Create(request, response))
route.post("/expense", (request, response) => CreateExpense(request, response))

export default route