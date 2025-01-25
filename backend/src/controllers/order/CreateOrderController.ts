import { Request, Response } from "express";
import { CreateOrderService } from "../../services/order/CreateOrderService";

class CreateOrderController {
  async handle(req: Request, res: Response) {
    const { table, name } = req.body;

    // return res.status(400).json({message: 'erro irmao'});
    try {
      if (!table || !name) {
        return res
          .status(400)
          .json({ message: "Erro ao criar pedido. Mesa ou nome faltantes." });
      }

      const createOrderController = new CreateOrderService();

      const order = await createOrderController.execute({ table, name });

      return res.status(201).json(order);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(500).json({ message: err.message });
      } else {
        return res.status(500).json({ message: "Erro inesperado." });
      }
    }
  }
}
export { CreateOrderController };
