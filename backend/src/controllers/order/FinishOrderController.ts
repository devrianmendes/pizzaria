import { Request, Response } from "express";
import { FinishOrderService } from "../../services/order/FinishOrderService";

class FinishOrderController {
  async handle(req: Request, res: Response) {
    const {orderId} = req.body;

    const finishOrderService = new FinishOrderService();
    
    const finishOrder = await finishOrderService.execute({orderId});

    return res.json(finishOrder);
}
}
export { FinishOrderController };
