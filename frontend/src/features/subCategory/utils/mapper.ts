import type { SubCategory } from '@shared/models/master';
import type { Option } from '@/components/ui/option';

const subCategoryToOption = (subCategory: SubCategory): Option => ({
  value: String(subCategory.subCategoryId),
  label: subCategory.subCategoryName,
});

export const subCategoriesToOptions = (subCategory: SubCategory[]): Option[] =>
  subCategory.map(subCategoryToOption);
