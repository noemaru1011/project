import { Request, Response } from "express";
import { StatusService } from "@/services/statusService";

export const StatusController = {
  async getAllStatuses(req: Request, res: Response) {
    try {
      const statuses = await StatusService.getAllstatuses();
      res.json(statuses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "予期せぬエラーが発生しました" });
    }
  },
};
