import { Request, Response } from "express";
import { PasswordService } from "@/services/passwordService";

export const PasswordController = {
  async updatePassword(req: Request, res: Response) {
    try {
      const user = (req as any).user;
      const studentId = user.id;
      await PasswordService.updatePassword(req.body, studentId);
      res.status(201).json({ message: "更新完了" });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ message: "予期せぬエラーが発生しました" });
    }
  },
};
