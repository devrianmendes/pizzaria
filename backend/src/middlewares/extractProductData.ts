import { Request, Response, NextFunction } from "express";

function extractProductData(req: Request, res: Response, next: NextFunction) {
  const { name, id } = req.body;

  console.log(req.body, 'body do extract')

  // Certifique-se de passar os dados para o Multer
  req.productName = name; // Armazene o nome do produto no request
  req.productId = id; // Armazene o ID do produto no request

  console.log(name, id, 'name e id no middleware')

  next();
}

export { extractProductData };