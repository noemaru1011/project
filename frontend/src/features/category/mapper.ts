import type { Category } from '@shared/models/master';
import type { Option } from '@/components/ui/option';

const categoryToOption = (category: Category): Option => ({
  value: category.categoryId,
  label: category.categoryName,
});

export const categoriesToOptions = (categories: Category[]): Option[] =>
  categories.map(categoryToOption);
