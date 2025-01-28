import { Request, Response } from "express";
import { CreateUserService } from "../../services/user/CreateUserService";

class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, email, password } = req.body;

    try {
      if (!email || !name || !password) {
        return res
          .status(400)
          .json({ message: "Erro ao criar usuário. Dados faltantes." });
      }
      const createUserService = new CreateUserService();
      const user = await createUserService.execute({ name, email, password });
      console.log(user);
      return res.status(201).json(user);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(500).json({ message: err.message });
      } else {
        return res.status(500).json({ message: "Erro inesperado." });
      }
    }
  }
}

export { CreateUserController };
