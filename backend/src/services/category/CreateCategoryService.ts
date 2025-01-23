import prismaClient from '../../prisma';

type CategoryRequest = {
    name: string;
};

class CreateCategoryService {
    async execute({ name }: CategoryRequest) {
        if (name === '') {
            throw new Error('Nome inválido.');
        }
        try {
            const category = await prismaClient.category.create({
                data: {
                    name: name,
                },
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

export { CreateCategoryService };
