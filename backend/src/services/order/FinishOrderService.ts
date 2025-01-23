import prismaClient from '../../prisma';

type OrderRequest = {
    orderId: string;
};

class FinishOrderService {
    async execute({ orderId }: OrderRequest) {
        if (!orderId) {
            return Error('Erro ao encerrar pedido. Id faltante.');
        }

        try {
            const order = await prismaClient.order.update({
                where: {
                    id: orderId,
                },
                data: {
                    status: true,
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

export { FinishOrderService };