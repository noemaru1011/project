import { SubCategoryRepository } from "@/repositories/subCategoryRepository";

export const SubCategoryService = {
  async getAllSubCategories() {
    const subCategories = await SubCategoryRepository.findAll();

    // ここで必要なら整形・ソート・バリデーションなど
    return subCategories;
  },
};
