import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";

class CreateProductController {
  async handle(req: Request, res: Response) {
    const { name, description, price, categoryId } = req.body;

    try {
      if (!name || !price || !description || !categoryId)
        return res
          .status(400)
          .json({ message: "Erro ao criar produto. Preencha os dados." });

      if (!req.file) {
        return res
          .status(400)
          .json({ message: "É necessário enviar uma foto para o produto." });
      } else {
        const { originalname, filename: banner } = req.file;

        const createProductService = new CreateProductService();
        const product = await createProductService.execute({
          name,
          description,
          price,
          banner,
          categoryId,
        });

        return res.status(200).json(product);
      }
    } catch (err) {
      if (err instanceof Error) {
        return res.status(500).json({ message: err.message });
      } else {
        return res.status(500).json({ message: "Erro inesperado." });
      }
    }
  }
}

export { CreateProductController };
