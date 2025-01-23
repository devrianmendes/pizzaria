import prismaClient from '../../prisma';

type OrderRequest = {
    orderId: string;
};
class DeleteOrderService {
    async execute({ orderId }: OrderRequest) {
        if (!orderId) {
            return Error('Erro ao excluir pedido. Id faltante.');
        }

        try {
            const order = await prismaClient.order.delete({
                where: {
                    id: orderId,
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

export { DeleteOrderService };