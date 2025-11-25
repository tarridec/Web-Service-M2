import { Router } from "express";
import * as orders from "../controllers/orders.controller";
import { auth } from "../middlewares/auth.middlewares";

const ordersRouter = Router();

ordersRouter.post("/", auth, orders.create);
ordersRouter.get("/me", auth, orders.getMyOrders);
ordersRouter.get("/:id", auth, orders.getById);

export default ordersRouter;