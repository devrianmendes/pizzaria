import prismaClient from '../../prisma';

class DetailUserService {
    async execute(user_id: string) {
        if (!user_id) {
            return Error('Erro ao detalhar usuário. Id faltante.');
        }

        try {
            const user = await prismaClient.user.findFirst({
                where: {
                    id: user_id,
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

export { DetailUserService };
