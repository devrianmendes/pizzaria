import prismaClient from '../../prisma';

type OrderRequest = {
    table: number;
    name: string;
};

class CreateOrderService {
    async execute({ table, name }: OrderRequest) {
        if (!table || !name) {
            return Error('Erro ao criar pedido. Mesa ou nome faltantes.');
        }

        try {
            const order = await prismaClient.order.create({
                data: {
                    table: table,
                    name: name,
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

export { CreateOrderService };