import prismaClient from '../../prisma';

type OrderRequest = {
    orderId: string;
};

class SendOrderService {
    async execute({ orderId }: OrderRequest) {
        if (!orderId) {
            return Error('Erro ao enviar pedido. Id Faltante.');
        }

        try {
            const order = await prismaClient.order.update({
                where: {
                    id: orderId,
                },
                data: {
                    draft: false,
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
export { SendOrderService };
