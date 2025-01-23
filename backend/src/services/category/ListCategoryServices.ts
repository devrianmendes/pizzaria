import prismaClient from '../../prisma';

class ListCategoryService {
    async execute() {
        try {
            const category = await prismaClient.category.findMany({
                select: {
                    id: true,
                    name: true,
                },
            });

            return category;
        } catch (err) {
            if (err instanceof Error) {
                return err.message;
            }
        }
    }
}

export { ListCategoryService };
