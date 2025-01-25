import prismaClient from "../../prisma";

type DeleteOrderRequest = {
  itemId: string;
};

class DeleteItemService {
  async execute({ itemId }: DeleteOrderRequest) {


    try {
      const order = await prismaClient.item.delete({
        where: {
          id: itemId,
        },
      });

      return order;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error("Erro ao deletar item do pedido. " + err.message);
      } else {
        throw new Error("Erro inesperado.");
      }
    }
  }
}

export { DeleteItemService };
