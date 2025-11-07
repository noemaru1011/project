import { MinorCategoryRepository } from "@/repositories/minorCategoryRepository";

export const MinorCategoryService = {
  async getAllMinorCategories() {
    const minorCategories = await MinorCategoryRepository.findAll();

    // ここで必要なら整形・ソート・バリデーションなど
    return minorCategories;
  },
};
