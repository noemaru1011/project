import type { Category } from '@/features/category';
import type { Option } from '@/components/ui/option';

const categoryToOption = (category: Category): Option => ({
  value: String(category.categoryId),
  label: category.categoryName,
});

export const categoriesToOptions = (categories: Category[]): Option[] =>
  categories.map(categoryToOption);
