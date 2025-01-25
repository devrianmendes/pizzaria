import prismaClient from "../../prisma";

type CategoryRequest = {
  name: string;
};

class CreateCategoryService {
  async execute({ name }: CategoryRequest) {
    try {
      const category = await prismaClient.category.create({
        data: { name },
        select: { id: true, name: true },
      });

      return category;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error("Erro na conexão com o banco de dados. " + err.message);
      } else {
        throw new Error("Erro genérico.");
      }
    }
  }
}

export { CreateCategoryService };
