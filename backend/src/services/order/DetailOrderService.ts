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
      select: {
        id: true,
        amount: true,
        // Aqui, você pode incluir o produto e o pedido, como estava comentado:
        product: {
          select: {
            id: true,
            name: true,
            description: true,
            price: true,
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
  }
}

export { DetailOrderService };
