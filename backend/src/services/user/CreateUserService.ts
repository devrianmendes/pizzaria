import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

type UserRequest = {
  name: string;
  email: string;
  password: string;
};

class CreateUserService {
  async execute({ name, email, password }: UserRequest) {
    try {
      const userAlreadyExist = await prismaClient.user.findFirst({
        where: {
          email: email,
        },
      });

      if (userAlreadyExist) {
        throw new Error("E-mail já cadastrado.");
      }

      const passwordHash = await hash(password, 8);

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
        throw new Error(`Erro ao criar usuário: ${err.message}`);
      } else {
        throw new Error("Erro genérico.");
      }
    }
  }
}

export { CreateUserService };
