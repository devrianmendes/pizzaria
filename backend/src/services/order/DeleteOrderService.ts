import prismaClient from "../../prisma";

type OrderRequest = {
  orderId: string;
};
class DeleteOrderService {
  async execute({ orderId }: OrderRequest) {
    try {
      const order = await prismaClient.order.delete({
        where: {
          id: orderId,
        },
      });

      return order;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error("Erro ao deletar categoria. " + err.message);
      } else {
        throw new Error("Erro inesperado.");
      }
    }
  }
}

export { DeleteOrderService };
