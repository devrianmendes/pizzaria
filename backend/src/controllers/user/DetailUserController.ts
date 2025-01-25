import { Request, Response } from "express";
import { DetailUserService } from "../../services/user/DetailUserService";

class DetailUserController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id;

    try {
      if (!user_id) {
        return res.status(400).json("Erro ao detalhar usuário. Id faltante.");
      }

      const detailUserService = new DetailUserService();
      const user = await detailUserService.execute(user_id);

      return res.status(200).json(user);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(500).json({ message: err.message });
      } else {
        return res.status(500).json({ message: "Erro inesperado." });
      }
    }
  }
}

export { DetailUserController };
