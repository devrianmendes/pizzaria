import { Request, Response } from "express";
import { ListProductByCategoryService } from "../../services/product/ListProductByCategoryService";

class ListProductByCategoryController {
  async handle(req: Request, res: Response) {
    const categoryId = req.query.categoryId as string;

    try {
      if (!categoryId) {
        return res.status(400).json({
          message: "Erro ao listar produtos. Id da categoria faltante.",
        });
      }
      const listProductByCategory = new ListProductByCategoryService();

      const list = await listProductByCategory.execute({ categoryId });

      return res.status(200).json(list);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(500).json({ message: err.message });
      } else {
        return res.status(500).json({ message: "Erro inesperado." });
      }
    }
  }
}

export { ListProductByCategoryController };
