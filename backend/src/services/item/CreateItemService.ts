import prismaClient from "../../prisma";

type ItemRequest = {
  orderId: string;
  productId: string;
  amount: number;
};

class CreateItemService {
  async execute({ orderId, productId, amount }: ItemRequest) {
    try {
      const order = await prismaClient.item.create({
        data: {
          orderId: orderId,
          productId: productId,
          amount: +amount,
        },
      });

      return order;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error("Erro ao adicionar item. " + err.message);
      } else {
        throw new Error("Erro inesperado.");
      }
    }
  }
}

export { CreateItemService };
