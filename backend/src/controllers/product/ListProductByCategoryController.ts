import { Request, Response } from "express";
import { ListProductByCategoryService } from "../../services/product/ListProductByCategoryService";

class ListProductByCategoryController {
  async handle(req: Request, res: Response) {
    const categoryId = req.query.categoryId as string;

    const listProductByCategory = new ListProductByCategoryService();

    const list = await listProductByCategory.execute({ categoryId });

    return res.json(list);
  }
}

export { ListProductByCategoryController };
