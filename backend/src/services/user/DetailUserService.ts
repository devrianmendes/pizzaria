import prismaClient from "../../prisma";

class DetailUserService {
  async execute(user_id: string) {
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
        throw new Error(`Erro ao buscar dados do usuário: ${err.message}`);
      } else {
        throw new Error("Erro genérico.");
      }
    }
  }
}

export { DetailUserService };
