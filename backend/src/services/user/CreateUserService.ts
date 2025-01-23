import prismaClient from '../../prisma';
import { hash } from 'bcryptjs';

type UserRequest = {
    name: string;
    email: string;
    password: string;
};

class CreateUserService {
    async execute({ name, email, password }: UserRequest) {
        if (!email || !name || !password) {
            throw new Error('Erro ao criar usuário. Dados faltantes.');
        }

        try {
            const userAlreadyExist = await prismaClient.user.findFirst({
                where: {
                    email: email,
                },
            });
            if (userAlreadyExist) {
                throw new Error('E-mail já cadastrado.');
            }
        } catch (err) {
            if (err instanceof Error) {
                return err.message;
            }
        }

        const passwordHash = await hash(password, 8);

        try {
            const user = await prismaClient.user.create({
                data: {
                    name: name,
                    email: email,
                    password: passwordHash,
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            });

            return user;
        } catch (err) {
            if (err instanceof Error) {
                return err.message;
            }
        }
    }
}

export { CreateUserService };