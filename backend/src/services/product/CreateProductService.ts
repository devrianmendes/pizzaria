import prismaClient from "../../prisma";

type ProductRequest = {
  name: string;
  price: string;
  description: string;
  banner: string;
  categoryId: string;
};

class CreateProductService {
  async execute({
    name,
    price,
    description,
    banner,
    categoryId,
  }: ProductRequest) {
    try {
      const product = await prismaClient.product.create({
        data: {
          name: name,
          price: price,
          description: description,
          banner: banner,
          categoryId: categoryId,
        },
      });
      return product;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error("Erro na conexão com o banco de dados. " + err.message);
      } else {
        throw new Error("Erro genérico.");
      }
    }
  }
}

export { CreateProductService };
