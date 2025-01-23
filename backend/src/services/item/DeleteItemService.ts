import prismaClient from '../../prisma';

type DeleteOrderRequest = {
    itemId: string;
};

class DeleteItemService {
    async execute({ itemId }: DeleteOrderRequest) {
        if (!itemId) {
            return Error('Erro ao deletar item do pedido.');
        }

        try {
            const order = await prismaClient.item.delete({
                where: {
                    id: itemId,
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

export { DeleteItemService };
