import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";

class CreateProductController {
  async handle(req: Request, res: Response) {
    const { name, description, price, category_id, banner } = req.body;
    const createProductService = new CreateProductService();
    const product = await createProductService.execute({
      name,
      description,
      price,
      category_id,
      banner,
    });
    return res.json(product);
  }
}

export { CreateProductController };
