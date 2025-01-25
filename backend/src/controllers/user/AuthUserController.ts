import { Request, Response } from "express";
import { AuthUserService } from "../../services/user/AuthUserService";

class AuthUserController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Erro ao autenticar. Usuário ou senha faltantes." });
      }
      const authUserService = new AuthUserService();
      const auth = await authUserService.execute({
        email,
        password,
      });

      return res.status(200).json(auth);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(401).json({ message: err.message });
      } else {
        return res.status(500).json({ message: "Erro inesperado." });
      }
    }
  }
}

export { AuthUserController };
