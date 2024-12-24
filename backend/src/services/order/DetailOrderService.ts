import prismaClient from "../../prisma";

type DetailOrderRequest = {
  orderId: string;
};

class DetailOrderService {
  async execute({ orderId }: DetailOrderRequest) {
    console.log(orderId, 'antes do ir no db')

    const order = await prismaClient.item.findMany({
      where: {
        orderId: orderId,
      },
      include: {
        product: true,
        order: true,
      }
    });

    console.log(order, "depois de ir no db")

    return order;
  }
}

export { DetailOrderService };
