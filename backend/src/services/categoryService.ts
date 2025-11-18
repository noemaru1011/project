import { CategoryRepository } from "@/repositories/categoryRepository";

export const CategoryService = {
  async getAllCategories() {
    const categories = await CategoryRepository.findAll();
    console.log(categories);
    return categories;
  },
};
