import prismaClient from '../../prisma';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

type AuthRequest = {
    email: string;
    password: string;
};

class AuthUserService {
    async execute({ email, password }: AuthRequest) {
        if (!email || !password) {
            return Error('Erro ao autenticar. Usuário ou senha faltantes.');
        }

        try {
            const user = await prismaClient.user.findFirst({
                where: {
                    email: email,
                },
            });

            if (!user) {
                throw new Error('Usuário ou password incorreto.');
            }

            const passwordMatch = await compare(password, user.password);

            if (!passwordMatch) {
                throw new Error('Usuário ou password incorreto.');
            }

            if (!process.env.SECRET) throw new Error('Erro interno.');

            const token = sign(
                {
                    name: user.name,
                    email: user.email,
                },
                process.env.SECRET,
                {
                    subject: user.id,
                    expiresIn: '30d',
                },
            );

            return {
                id: user.id,
                name: user.name,
                email: user.email,
                token: token,
            };
        } catch (err) {
            if (err instanceof Error) {
                return err.message;
            }
        }
    }
}

export { AuthUserService };
