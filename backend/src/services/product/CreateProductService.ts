import prismaClient from '../../prisma';

type ProductRequest = {
    name: string;
    price: string;
    description: string;
    banner: string;
    categoryId: string;
};

class CreateProductService {
    async execute({
        name,
        price,
        description,
        banner,
        categoryId,
    }: ProductRequest) {
        if (!name || !price || !description || !banner || !categoryId) {
            return Error('Erro ao criar produto. Preencha os dados.');
        }

        try {
            const product = await prismaClient.product.create({
                data: {
                    name: name,
                    price: price,
                    description: description,
                    banner: banner,
                    categoryId: categoryId,
                },
            });
            return product;
        } catch (err) {
            if (err instanceof Error) {
                return err.message;
            }
        }
    }
}

export { CreateProductService };