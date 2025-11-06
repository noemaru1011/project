import { Request, Response, NextFunction } from "express";

export const csrfMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const clientToken = req.headers["x-csrf-token"];
  const sessionToken = (req as any).session?.csrfToken;
  if (!clientToken || clientToken !== sessionToken) {
    return res.status(403).json({ message: "CSRF 無効なトークンです" });
  }

  next();
};
