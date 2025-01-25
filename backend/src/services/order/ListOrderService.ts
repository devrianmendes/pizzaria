import prismaClient from "../../prisma";

class ListOrderService {
  async execute() {
    try {
      const listOrder = await prismaClient.order.findMany({
        where: {
          draft: false,
          status: false,
        },
        orderBy: {
          createdAt: "asc",
        },
      });

      return listOrder;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error("Erro na conexão com o banco de dados. " + err.message);
      } else {
        throw new Error("Erro genérico.");
      }
    }
  }
}

export { ListOrderService };
