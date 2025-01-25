import { Request, Response } from "express";
import { DetailOrderService } from "../../services/order/DetailOrderService";

class DetailOrderController {
  async handle(req: Request, res: Response) {
    const orderId = req.query.orderId as string;

    try {
      const detailOrderService = new DetailOrderService();

      if (!orderId) {
        return res
          .status(400)
          .json({ message: "Erro ao detalhar pedido. Id faltante." });
      }

      const detailOrder = await detailOrderService.execute({ orderId });

      return res.status(200).json(detailOrder);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(500).json({ message: err.message });
      } else {
        return res.status(500).json({ message: "Erro inesperado." });
      }
    }
  }
}
export { DetailOrderController };
