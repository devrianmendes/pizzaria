import prismaClient from "../../prisma";

type CategoryRequest = {
    name: string;
}

class CreateCategoryService{
    async execute({name}: CategoryRequest){

        console.log(name)
        if(name === ""){
            throw new Error('Nome inválido.')
        }

        const category = await prismaClient.category.create({
            data: {
                name: name,
            },
            select: {
                id: true,
                name: true,
            }
        });

        return category;
    }
}

export {CreateCategoryService};