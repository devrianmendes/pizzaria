import { Request, Response } from "express";
import { ListCategoryService } from "../../services/category/ListCategoryServices";

class ListCategoryController {
  async handle(req: Request, res: Response) {
    const listCategoryService = new ListCategoryService();

    try {
      const category = await listCategoryService.execute();
      return res.status(200).json(category);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(500).json({ message: err.message });
      } else {
        return res.status(500).json({ message: "Erro inesperado." });
      }
    }
  }
}

export { ListCategoryController };
