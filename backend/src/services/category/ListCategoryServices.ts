import prismaClient from "../../prisma";

class ListCategoryService {
  async execute() {
    try {
      const category = await prismaClient.category.findMany({
        select: {
          id: true,
          name: true,
        },
      });

      return category;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error("Erro ao carregar as categorias. " + err.message);
      } else {
        throw new Error("Erro inesperado.");
      }
    }
  }
}

export { ListCategoryService };
