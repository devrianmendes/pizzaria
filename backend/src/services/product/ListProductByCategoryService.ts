import prismaClient from "../../prisma";

type ProductRequest = {
    categoryId: string;
}
class ListProductByCategoryService{
    async execute({categoryId}: ProductRequest) {
        const findByCategory = await prismaClient.product.findMany({
            where: {
                categoryId: categoryId,
            }
        });
        return findByCategory;
    }
}

export {ListProductByCategoryService};