import { Request, Response } from "express";
import { DeleteOrderService } from "../../services/order/DeleteOrderService";

class DeleteOrderController {
  async handle(req: Request, res: Response) {
    const orderId = req.query.orderId as string;

    try {
      if (!orderId) {
        return res
          .status(400)
          .json({ message: "Erro ao excluir pedido. Id faltante." });
      }
      const deleteOrderService = new DeleteOrderService();
      const deleteOrder = await deleteOrderService.execute({ orderId });
      return res.status(200).json(deleteOrder);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(500).json({ message: err.message });
      } else {
        return res.status(500).json({ message: "Erro inesperado." });
      }
    }
  }
}

export { DeleteOrderController };
