import prismaClient from "../../prisma";

type OrderRequest = {
  orderId: string;
};
class DeleteOrderService {
  async execute({ orderId }: OrderRequest) {
    const order = await prismaClient.order.delete({
      where: {
        id: orderId,
      },
    });

    return order;
  }
}

export { DeleteOrderService };
