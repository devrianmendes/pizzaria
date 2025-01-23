import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

type PayLoad = {
  sub: string;
};

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).end;
  }

  const [, token] = authToken.split(" ");

  if (!process.env.SECRET) {
    throw new Error("Erro interno.");
  }
  try {
    const { sub } = verify(token, process.env.SECRET) as PayLoad;
  
    req.user_id = sub;
} catch (error) {
    return res.status(401).end();
  }

  return next();
}