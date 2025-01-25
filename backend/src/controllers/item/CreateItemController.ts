import { Request, Response } from "express";
import { CreateItemService } from "../../services/item/CreateItemService";

class CreateItemController {
  async handle(req: Request, res: Response) {
    const { orderId, productId, amount } = req.body;

    const createItemService = new CreateItemService();

    try {
      if (!orderId || !productId || !amount) {
        return res
          .status(400)
          .json({ message: "Dados para incluir itens faltantes." });
      }

      const item = await createItemService.execute({
        orderId,
        productId,
        amount,
      });

      return res.status(201).json(item);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      } else {
        return res.status(500).json({ message: "Erro inesperado." });
      }
    }
  }
}

export { CreateItemController };
