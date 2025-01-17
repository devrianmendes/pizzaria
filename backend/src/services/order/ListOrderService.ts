import prismaClient from "../../prisma";

class ListOrderService {
  async execute() {
    const listOrder = await prismaClient.order.findMany({
      where: {
        draft: false,
        status: false,
      },
      orderBy: {
        createdAt: 'asc'
      },
    });
    return listOrder;
  }
}

export { ListOrderService };
