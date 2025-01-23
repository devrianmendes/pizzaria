import prismaClient from '../../prisma';

type ProductRequest = {
    categoryId: string;
};
class ListProductByCategoryService {
    async execute({ categoryId }: ProductRequest) {
        if (!categoryId) {
            return Error('Erro ao listar produtos. Id da categoria faltante.');
        }

        try {
            const findByCategory = await prismaClient.product.findMany({
                where: {
                    categoryId: categoryId,
                },
            });
            return findByCategory;
        } catch (err) {
            if (err instanceof Error) {
                return err.message;
            }
        }
    }
}

export { ListProductByCategoryService };