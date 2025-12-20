import type { MinorCategory } from '@/features/minorCategory';
import type { Option } from '@/components/ui/option';

const minorCategoryToOption = (minorCategory: MinorCategory): Option => ({
  value: String(minorCategory.minorCategoryId),
  label: minorCategory.minorCategoryName,
});

export const minorCategoriesToOptions = (minorCategory: MinorCategory[]): Option[] =>
  minorCategory.map(minorCategoryToOption);
