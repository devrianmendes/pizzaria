import { Request, Response } from "express";
import { ListOrderService } from "../../services/order/ListOrderService";

class ListOrderController {
  async handle(Req: Request, res: Response) {
    try {
      const listOrderService = new ListOrderService();

      const listOrder = await listOrderService.execute();

      return res.status(200).json(listOrder);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(500).json({ message: err.message });
      } else {
        return res.status(500).json({ message: "Erro inesperado." });
      }
    }
  }
}
export { ListOrderController };
