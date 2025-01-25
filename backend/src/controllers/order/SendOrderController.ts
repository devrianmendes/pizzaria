import { Request, Response } from "express";
import { SendOrderService } from "../../services/order/SendOrderService";

class SendOrderController {
  async handle(req: Request, res: Response) {
    const { orderId } = req.body;

    try {
      if (!orderId) {
        return res
          .status(400)
          .json({ message: "Erro ao enviar pedido. Id Faltante." });
      }
      const sendOrderService = new SendOrderService();

      const order = await sendOrderService.execute({ orderId });

      return res.status(200).json(order);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(500).json({ message: err.message });
      } else {
        return res.status(500).json({ message: "Erro inesperado." });
      }
    }
  }
}

export { SendOrderController };
