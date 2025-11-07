import { CategoryRepository } from "@/repositories/categoryRepository";

export const CategoryService = {
  async getAllCategories() {
    const categories = await CategoryRepository.findAll();
    // ここで加工・フィルタ・ソートなどのビジネスロジックを実装可能
    return categories;
  },
};
