import { Request, Response } from "express";
import { DeleteItemService } from "../../services/item/DeleteItemService";

class DeleteItemController {
  async handle(req: Request, res: Response) {
    const itemId = req.query.itemId as string;

    if (!itemId) {
      return res
        .status(400)
        .json({ message: "Erro ao deletar item. Id faltante." });
    }

    try {
      const deleteItemService = new DeleteItemService();
      const item = await deleteItemService.execute({ itemId });
      return res.status(200).json(item);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(500).json({ message: err.message });
      } else {
        return res.status(500).json({ message: "Erro inesperado." });
      }
    }
  }
}

export { DeleteItemController };
