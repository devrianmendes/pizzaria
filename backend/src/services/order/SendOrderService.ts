import prismaClient from "../../prisma";

type OrderRequest = {
  orderId: string;
};

class SendOrderService {
  async execute({ orderId }: OrderRequest) {
    try {
      const order = await prismaClient.order.update({
        where: {
          id: orderId,
        },
        data: {
          draft: false,
        },
      });
      return order;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error("Erro na conexão com o banco de dados. " + err.message);
      } else {
        throw new Error("Erro genérico.");
      }
    }
  }
}
export { SendOrderService };
