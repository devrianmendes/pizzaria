import prismaClient from '../../prisma';

type ItemRequest = {
    orderId: string;
    productId: string;
    amount: number;
};

class CreateItemService {
    async execute({ orderId, productId, amount }: ItemRequest) {
        if (!orderId || !productId || !amount) {
            return Error('Dados para incluir itens faltantes.');
        }

        try {
            const order = await prismaClient.item.create({
                data: {
                    orderId: orderId,
                    productId: productId,
                    amount: +amount,
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

export { CreateItemService };
