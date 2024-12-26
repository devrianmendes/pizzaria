import prismaClient from "../../prisma";

type DetailOrderRequest = {
  orderId: string;
};

class DetailOrderService {
  async execute({ orderId }: DetailOrderRequest) {
    const order = await prismaClient.item.findMany({
      where: {
        orderId: orderId,
      },
      include: {
        product: true,
        order: true,
      },
    });

    return order;
  }
}

export { DetailOrderService };
