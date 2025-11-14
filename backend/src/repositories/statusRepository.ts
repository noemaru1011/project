import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const StatusRepository = {
  async findAll() {
    return prisma.status.findMany({
      select: {
        statusId: true,
        statusName: true,
      },
      orderBy: { statusId: "asc" },
    });
  },
};
