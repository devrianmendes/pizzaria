import { Request, Response } from "express";
import { DeleteOrderService } from "../../services/order/DeleteOrderService";

class DeleteOrderController {
  async handle(req: Request, res: Response) {
    const orderId = req.query.orderId as string;

    const deleteOrderService = new DeleteOrderService();

    const deleteOrder = await deleteOrderService.execute({ orderId });

    return res.json(deleteOrder);
  }
}

export { DeleteOrderController };
