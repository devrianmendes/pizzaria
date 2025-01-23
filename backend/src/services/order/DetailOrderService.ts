import prismaClient from '../../prisma';

type DetailOrderRequest = {
    orderId: string;
};

class DetailOrderService {
    async execute({ orderId }: DetailOrderRequest) {
        if (!orderId) {
            return Error('Erro ao detalhar pedido. Id faltante.');
        }

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
                return err.message;
            }
        }
    }
}

export { DetailOrderService };