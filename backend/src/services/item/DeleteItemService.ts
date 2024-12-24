import prismaClient from "../../prisma";

type DeleteOrderRequest = {
    itemId: string;
}

class DeleteItemService{
    async execute({itemId}: DeleteOrderRequest) {

        const order = await prismaClient.item.delete({
            where: {
                id: itemId,
            }
        });

        return order;
    }
}

export {DeleteItemService};