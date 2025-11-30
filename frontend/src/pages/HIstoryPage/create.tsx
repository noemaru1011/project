import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Textarea } from '@/components/atoms/Textarea';
import { Table } from '@/components/molecules/Table';
import { CheckboxGroup } from '@/components/molecules/CheckboxGroup';
import { RadioGroup } from '@/components/molecules/RadioGroup';
import { Accordion } from '@/components/molecules/Accordion';
import { Loading } from '@/components/atoms/Loading';
import { categoryOptions } from '@/constants/categoryOptions';
import { subCategoryOptions } from '@/constants/subCategoryOptions';
import { minorCategoryOptions } from '@/constants/minorCategoryOptions';
import { gradeOptions } from '@/constants/gradeOptions';
import { departmentOptions } from '@/constants/departmentOptions';
import { statusOptions } from '@/constants/statusOptions';
import { History_StudentLabels } from '@/constants/studentLabels';
import { StudentSearchApi } from '@/api/studentSearchApi';
import { useSearch } from '@/hooks/useSearch';
import type { StudentQuery } from '@/interface/studentQuery';
import { handleApiError } from '@/utils/handleApiError';
import type { StudentForSearch } from '@/interface/student';

export const HistoryCreate = () => {
  const navigate = useNavigate();
  const { handleSubmit, control, getValues } = useForm<StudentQuery>({
    defaultValues: {
      categoryId: [],
      subCategoryId: [],
      minorCategoryId: [],
      departmentId: [],
      grade: [],
    },
  });

  const {
    data: results,
    loading,
    search,
  } = useSearch<StudentForSearch, StudentQuery>(StudentSearchApi.search);

  const onSubmit = async () => {
    const query = getValues();
    try {
      await search(query);
    } catch (err: any) {
      handleApiError(err, navigate);
    }
  };

  const accordionItems = [
    {
      id: 'category',
      title: '大分類',
      children: (
        <Controller
          name="categoryId"
          control={control}
          render={({ field, fieldState }) => (
            <CheckboxGroup
              name={field.name}
              value={field.value.map(String)}
              onChange={(vals) => field.onChange(vals.map(Number))}
              options={categoryOptions}
              error={fieldState.error?.message}
              row={4}
            />
          )}
        />
      ),
    },
    {
      id: 'subCategory',
      title: '中分類',
      children: (
        <Controller
          name="subCategoryId"
          control={control}
          render={({ field, fieldState }) => (
            <CheckboxGroup
              name={field.name}
              value={field.value.map(String)}
              onChange={(vals) => field.onChange(vals.map(Number))}
              options={subCategoryOptions}
              error={fieldState.error?.message}
              row={4}
            />
          )}
        />
      ),
    },
    {
      id: 'minorCategory',
      title: '小分類',
      children: (
        <Controller
          name="minorCategoryId"
          control={control}
          render={({ field, fieldState }) => (
            <CheckboxGroup
              name={field.name}
              value={field.value.map(String)}
              onChange={(vals) => field.onChange(vals.map(Number))}
              options={minorCategoryOptions}
              error={fieldState.error?.message}
              row={4}
            />
          )}
        />
      ),
    },
    {
      id: 'grade',
      title: '学年',
      children: (
        <Controller
          name="grade"
          control={control}
          render={({ field, fieldState }) => (
            <CheckboxGroup
              name={field.name}
              value={field.value.map(String)}
              onChange={(vals) => field.onChange(vals.map(Number))}
              options={gradeOptions}
              error={fieldState.error?.message}
            />
          )}
        />
      ),
    },
    {
      id: 'department',
      title: '学科',
      children: (
        <Controller
          name="departmentId"
          control={control}
          render={({ field, fieldState }) => (
            <CheckboxGroup
              name={field.name}
              value={field.value.map(String)}
              onChange={(vals) => field.onChange(vals.map(Number))}
              options={departmentOptions}
              error={fieldState.error?.message}
            />
          )}
        />
      ),
    },
  ];

  return (
    <div className="p-4 flex flex-col items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full max-w-2xl gap-4 sm:gap-6"
      >
        <Accordion items={accordionItems} allowMultiple={true} className="w-full" />
        <Button variant="Search" type="submit" className="self-end" />
      </form>
      <form>
        <Controller
          name="StatusId"
          control={control}
          render={({ field, fieldState }) => (
            <RadioGroup
              label="状況"
              name={field.name}
              options={statusOptions}
              required
              error={fieldState.error?.message}
            />
          )}
        />
        <Input id="startTime" type="datetime-local" label="有効開始日" required />
        <Input
          id="endTime"
          type="datetime-local"
          label="有効終了日"
          helperText="未定の場合は時間を設定しないでください。"
        />
        <Textarea id="other" label="備考欄" helperText="例 「於:〇〇病院」" />
        <Button variant="Create" type="submit" />
      </form>

      <Loading loading={loading}>
        <Table labels={History_StudentLabels} data={results} keyField="studentId" />
      </Loading>
    </div>
  );
};
