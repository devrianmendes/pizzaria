import { Request, Response } from "express";
import { DeleteCategoryService } from "../../services/category/DeleteCategoryService";

class DeleteCategoryController {
  async handle(req: Request, res: Response) {
    const { id } = req.query;

    try {
      
      const deleteCategoryService = new DeleteCategoryService();
      const category = await deleteCategoryService.execute({ id } as {id: string});
      return res.status(201).json(category);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(500).json({ message: err.message });
      } else {
        return res.status(500).json({ message: "Erro inesperado." });
      }
    }
  }
}

export { DeleteCategoryController };
