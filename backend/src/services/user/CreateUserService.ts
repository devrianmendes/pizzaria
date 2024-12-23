import prismaClient from "../../prisma";
import {hash} from 'bcryptjs';

type UserRequest = {
    name: string;
    email: string;
    password: string;
}

class CreateUserService{
    async execute({name, email, password}: UserRequest) {
        if(!email) {
            throw new Error("Email incorreto");
        }

        const userAlreadyExist = await prismaClient.user.findFirst({
            where: {
                email: email,
            }
        })

        if(userAlreadyExist) {
            throw new Error("E-mail já cadastrado.");
        }

        const passwordHash = await hash(password, 8);

        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash
            }, select: {
                id: true,
                name: true,
                email: true,
            }
        });
        
        
        
        return user;
    }
}

export {CreateUserService};