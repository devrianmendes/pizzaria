import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";

class CreateProductController {
  async handle(req: Request, res: Response) {
    const { name, description, price, categoryId } = req.body;

    const createProductService = new CreateProductService();

    if (!req.file) {
      throw new Error("É necessário enviar uma foto para o produto.");
    } else {
      const { originalname, filename: banner } = req.file;

      const product = await createProductService.execute({
        name,
        description,
        price,
        banner,
        categoryId,
      });

      return res.json(product);
    }
  }
}

export { CreateProductController };
