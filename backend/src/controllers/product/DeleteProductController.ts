import { Request, Response } from "express";
import { DeleteProductService } from "../../services/product/DeleteProductService";

class DeleteProductController {
  async handle(req: Request, res: Response) {
    const { itemId } = req.query;

    try {
      if (!itemId)
        return res
          .status(400)
          .json({ message: "Erro ao deletar produto. Id faltante." });

      const deleteProductService = new DeleteProductService();
      const product = await deleteProductService.execute({
        itemId,
      } as { itemId: string });

      return res.status(200).json(product);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(500).json({ message: err.message });
      } else {
        return res.status(500).json({ message: "Erro inesperado." });
      }
    }
  }
}

export { DeleteProductController };
