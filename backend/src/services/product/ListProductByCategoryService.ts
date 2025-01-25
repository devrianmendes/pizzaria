import prismaClient from "../../prisma";

type ProductRequest = {
  categoryId: string;
};
class ListProductByCategoryService {
  async execute({ categoryId }: ProductRequest) {
    try {
      const findByCategory = await prismaClient.product.findMany({
        where: {
          categoryId: categoryId,
        },
      });
      return findByCategory;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error("Erro na conexão com o banco de dados. " + err.message);
      } else {
        throw new Error("Erro genérico.");
      }
    }
  }
}

export { ListProductByCategoryService };
