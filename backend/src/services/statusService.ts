import { StatusRepository } from "@/repositories/statusRepository";

export const StatusService = {
  async getAllstatuses() {
    const statuses = await StatusRepository.findAll();
    return statuses;
  },
};
