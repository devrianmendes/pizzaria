import { Request, Response } from "express";
import { FinishOrderService } from "../../services/order/FinishOrderService";

class FinishOrderController {
  async handle(req: Request, res: Response) {
    const { orderId } = req.body;

    try {
      if (!orderId) {
        return res
          .status(400)
          .json({ message: "Erro ao encerrar pedido. Id faltante." });
      }

      const finishOrderService = new FinishOrderService();

      const finishOrder = await finishOrderService.execute({ orderId });

      return res.status(200).json(finishOrder);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(500).json({ message: err.message });
      } else {
        return res.status(500).json({ message: "Erro inesperado." });
      }
    }
  }
}
export { FinishOrderController };
