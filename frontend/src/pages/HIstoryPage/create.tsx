import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Textarea } from '@/components/atoms/Textarea';
import { Table } from '@/components/molecules/Table';
import { RadioGroup } from '@/components/molecules/RadioGroup';
import { Loading } from '@/components/atoms/Loading';
import { statusOptions } from '@/constants/statusOptions';
import { HistoryLabels } from '@/constants/historyLabels';
import { StudentSearchApi } from '@/api/studentSearchApi';
import { useSearch } from '@/hooks/useSearch';
import type { StudentQuery } from '@/interface/studentQuery';
import { StudentSearchPanel } from '@/pages/studentPage/search';
import type { StudentForSearch } from '@/interface/student';
import { validation } from '@shared/schemas/history';
import type { HistoryForm } from '@shared/schemas/history';
import { handleApiError } from '@/utils/handleApiError';

export const HistoryCreate = () => {
  const navigate = useNavigate();
  // const { create, loading } = useCreate<StudentForm>(StudentApi.create);
  const { data, loading, search } = useSearch<StudentForSearch, StudentQuery>(
    StudentSearchApi.search,
  );
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validation),
  });

  const onSubmit = async (data: HistoryForm) => {
    try {
      console.log(data);
      //const res = await create(data);
      //toast.success(res.message);
    } catch (err: any) {
      handleApiError(err, navigate);
    }
  };

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
      {/* 左側：検索とテーブル */}
      <div className="w-full">
        <StudentSearchPanel onSearch={search} />
        <Loading loading={loading}>
          <Table labels={HistoryLabels} data={data} keyField="studentId" />
        </Loading>
      </div>

      {/* 右側：フォーム */}
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
        <Controller
          name="StatusId"
          control={control}
          render={({ field, fieldState }) => (
            <RadioGroup
              label="状況"
              name={field.name}
              options={statusOptions}
              value={field.value !== undefined ? String(field.value) : undefined}
              onChange={(val) => field.onChange(Number(val))}
              required
              error={fieldState.error?.message}
            />
          )}
        />

        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            id="startTime"
            type="datetime-local"
            label="有効開始日"
            required
            error={errors.startTime?.message}
            {...register('startTime')}
          />
          <Input
            id="endTime"
            type="datetime-local"
            label="有効終了日"
            error={errors.endTime?.message}
            {...register('endTime')}
            helperText="未定の場合は時間を設定しないでください。"
          />
        </div>

        <Textarea
          id="other"
          label="備考欄"
          helperText="例 「於:〇〇病院」"
          error={errors.other?.message}
          {...register('other')}
        />

        <Button variant="Create" type="submit" className="mt-4 w-full sm:w-64 mx-auto py-2" />
      </form>
    </div>
  );
};
