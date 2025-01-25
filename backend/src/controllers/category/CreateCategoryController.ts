import { Request, Response } from "express";
import { CreateCategoryService } from "../../services/category/CreateCategoryService";

class CreateCategoryController {
  async handle(req: Request, res: Response) {
    const { name } = req.body;

    try {
      if (!name || name.trim() === "") {
        return res.status(400).json({ message: "Nome inválido." });
      }
      const createCategoryService = new CreateCategoryService();
      const category = await createCategoryService.execute({ name });
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

export { CreateCategoryController };
