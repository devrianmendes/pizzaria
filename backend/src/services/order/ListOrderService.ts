import prismaClient from '../../prisma';

class ListOrderService {
    async execute() {
        try {
            const listOrder = await prismaClient.order.findMany({
                where: {
                    draft: false,
                    status: false,
                },
                orderBy: {
                    createdAt: 'asc',
                },
            });
            return listOrder;
        } catch (err) {
            if (err instanceof Error) {
                return err.message;
            }
        }
    }
}

export { ListOrderService };