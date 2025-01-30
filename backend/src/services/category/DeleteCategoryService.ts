import prismaClient from "../../prisma";

type CategoryRequest = {
  id: string;
};

class DeleteCategoryService {
  async execute({ id }: CategoryRequest) {
    try {
      const category = await prismaClient.category.delete({
        where: {
          id: id,
        },
      });

      console.log(category);
      return category;
    } catch (err) {
      if (err instanceof Error) {
        if (err.message.includes("Foreign key constraint violated")) {
          throw new Error("Existem produtos nessa categoria.");
        }
        throw new Error("Erro na conexão com o banco de dados. " + err.message);
      } else {
        throw new Error("Erro genérico.");
      }
    }
  }
}

export { DeleteCategoryService };
