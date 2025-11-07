import { StatusRepository } from "@/repositories/statusRepository";

export const StatusService = {
  async getAllstatuses() {
    const statuses = await StatusRepository.findAll();
    // ここで加工・フィルタ・ソートなどのビジネスロジックを実装可能
    return statuses;
  },
};
