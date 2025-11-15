import { useForm } from "react-hook-form";
import { Button } from "@/components/elements/Button";
import { CheckGroup } from "@/components/elements/CheckGroup";
import { RadioGroup } from "@/components/elements/RadioGroup";
import { categoryOptions } from "@/constants/category";
import { subCategoryOptions } from "@/constants/subCategory";
import { minorCategoryOptions } from "@/constants/minorCategory";
import { departmentOptions } from "@/constants/department";
import { gradeOptions } from "@/constants/grade";

type FormValues = {
  categories: string[];
  subCategories: string[];
  minorCategories: string[];
  grade: string[];
  departments: string[];
};

export const HistoryCreate = () => {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      categories: [],
      subCategories: [],
      minorCategories: [],
      grade: [],
      departments: [],
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-3">
        <fieldset>
          <legend>大分類</legend>
          <CheckGroup
            name="categories"
            options={categoryOptions}
            control={control}
          />
        </fieldset>
        <fieldset>
          <legend>中分類</legend>
          <CheckGroup
            name="subCategories"
            options={subCategoryOptions}
            control={control}
            columns={4}
          />
        </fieldset>
        <fieldset>
          <legend>小分類</legend>
          <CheckGroup
            name="minorCategories"
            options={minorCategoryOptions}
            control={control}
            columns={8}
          />
        </fieldset>
        <fieldset>
          <legend>学年</legend>
          <CheckGroup name="grade" options={gradeOptions} control={control} />
        </fieldset>
        <fieldset>
          <legend>学科</legend>
          <CheckGroup
            name="departments"
            options={departmentOptions}
            control={control}
          />
        </fieldset>
      </div>
      <Button variant="Search" type="submit" />
    </form>
  );
};
