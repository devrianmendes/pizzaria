import prismaClient from "../../prisma";

type OrderRequest = {
  table: number;
  name: string;
};

class CreateOrderService {
  async execute({ table, name }: OrderRequest) {
    try {
      const order = await prismaClient.order.create({
        data: {
          table: table,
          name: name,
        },
      });

      return order;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error("Erro ao criar pedido. " + err.message);
      } else {
        throw new Error("Erro inesperado.");
      }
    }
  }
}

export { CreateOrderService };
