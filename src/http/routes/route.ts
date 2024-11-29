import { Router } from "express";
import { Create } from "../controllers/user-contoller";

const route = Router();

route.post("/user", (request, response) => Create(request, response))

export default route