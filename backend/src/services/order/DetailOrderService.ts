import prismaClient from "../../prisma";

type DetailOrderRequest = {
  orderId: string;
};

class DetailOrderService {
  async execute({ orderId }: DetailOrderRequest) {
    try {
      const order = await prismaClient.item.findMany({
        where: {
          orderId: orderId,
        },
        select: {
          id: true,
          amount: true,
          product: {
            select: {
              id: true,
              name: true,
              description: true,
              price: true,
              banner: true,
            },
          },
          order: {
            select: {
              id: true,
              name: true,
              table: true,
            },
          },
        },
      });

      return order;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error("Erro ao carregar pedido. " + err.message);
      } else {
        throw new Error("Erro inesperado.");
      }
    }
  }
}

export { DetailOrderService };
