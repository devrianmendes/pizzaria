import prismaClient from "../../prisma";

type ItemRequest = {
    orderId: string;
    productId: string;
    amount: number;
}

class CreateItemService{
    async execute({orderId, productId, amount}: ItemRequest) {
        
        const order = await prismaClient.item.create({
            data: {
                orderId: orderId,
                productId: productId,
                amount,
            }
        });
        return order;
    }
}

export {CreateItemService};