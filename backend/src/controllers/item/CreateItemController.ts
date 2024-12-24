import { Request, Response } from "express";
import { CreateItemService } from "../../services/item/CreateItemService";

class CreateItemController {
  async handle(req: Request, res: Response) {
    const { orderId, productId, amount } = req.body;

    const createItemService = new CreateItemService();

    const item = await createItemService.execute({ orderId, productId, amount });

    return res.json(item);
  }
}

export { CreateItemController };
