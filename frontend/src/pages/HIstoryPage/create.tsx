import { useForm } from "react-hook-form";
import { Button } from "@/components/elements/Button";
import { CheckGroup } from "@/components/elements/CheckGroup";
import { RadioGroup } from "@/components/elements/RadioGroup";
import { categoryOptions } from "@/constants/category";
import { subCategoryOptions } from "@/constants/subCategory";
import { minorCategoryOptions } from "@/constants/minorCategory";
import { departmentOptions } from "@/constants/department";
import { gradeOptions } from "@/constants/grade";
import { statusOptions } from "@/constants/status";

type FormValues = {
  categories: string[];
  subCategories: string[];
  minorCategories: string[];
  grade: string[];
  departments: string[];
  status: string[];
};

export const HistoryCreate = () => {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      categories: [],
      subCategories: [],
      minorCategories: [],
      grade: [],
      departments: [],
      status: [],
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-3">
        <fieldset className="border border-gray-300 rounded-xl p-4 space-y-2">
          <legend className="px-2 text-sm font-medium">大分類</legend>
          <CheckGroup
            name="categories"
            options={categoryOptions}
            control={control}
          />
        </fieldset>

        <fieldset className="border border-gray-300 rounded-xl p-4 space-y-2">
          <legend className="px-2 text-sm font-medium">中分類</legend>
          <CheckGroup
            name="subCategories"
            options={subCategoryOptions}
            control={control}
            columns={4}
          />
        </fieldset>

        <fieldset className="border border-gray-300 rounded-xl p-4 space-y-2">
          <legend className="px-2 text-sm font-medium">小分類</legend>
          <CheckGroup
            name="minorCategories"
            options={minorCategoryOptions}
            control={control}
            columns={4}
          />
        </fieldset>

        <fieldset className="border border-gray-300 rounded-xl p-4 space-y-2">
          <legend className="px-2 text-sm font-medium">学年</legend>
          <CheckGroup name="grade" options={gradeOptions} control={control} />
        </fieldset>

        <fieldset className="border border-gray-300 rounded-xl p-4 space-y-2">
          <legend className="px-2 text-sm font-medium">学科</legend>
          <CheckGroup
            name="departments"
            options={departmentOptions}
            control={control}
          />
        </fieldset>

        <fieldset className="border border-gray-300 rounded-xl p-4 space-y-2">
          <legend className="px-2 text-sm font-medium">状態選択</legend>
          <RadioGroup name="status" options={statusOptions} control={control} />
        </fieldset>
      </div>

      <Button variant="Search" type="submit" />
    </form>
  );
};
