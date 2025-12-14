import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Textarea } from '@/components/atoms/Textarea';
import { Table } from '@/components/molecules/Table';
import { RadioGroup } from '@/components/molecules/RadioGroup';
import { Loading } from '@/components/atoms/Loading';
import { statusOptions } from '@/constants/statusOptions';
import { HistorySearchLabels } from '@/constants/historyLabels';
import { StudentSearchApi } from '@/api/studentSearchApi';
import { HistoryApi } from '@/api/historyApi';
import { useSearch } from '@/hooks/useSearch';
import { useCreate } from '@/hooks/useCreate';
import type { StudentQuery } from '@/interface/studentQuery';
import { StudentSearchPanel } from '@/pages/studentPage/search';
import type { StudentResult } from '@/interface/student';
import { validation } from '@shared/schemas/history';
import type { HistoryForm } from '@shared/schemas/history';
import { handleApiError } from '@/utils/handleApiError';

export const HistoryCreate = () => {
  const navigate = useNavigate();
  const { create, loading: createLoading } = useCreate<HistoryForm>(HistoryApi.create);
  const {
    data,
    loading: searchLoading,
    search,
  } = useSearch<StudentResult, StudentQuery>(StudentSearchApi.search);
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validation),
    defaultValues: {
      studentIds: [],
    },
  });

  const [selectedStudents, setSelectedStudents] = useState<{ id: string; name: string }[]>([]);

  const onSubmit = async (data: HistoryForm) => {
    try {
      data.studentIds = selectedStudents.map((s) => s.id);
      const res = await create(data);
      toast.success(res.message);
    } catch (err: any) {
      handleApiError(err, navigate);
    }
  };

  return (
    <div className="mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">履歴作成</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* 左側：検索とテーブル */}
        <div className="w-full">
          <StudentSearchPanel onSearch={search} />
          <Loading loading={searchLoading}>
            {errors.studentIds && (
              <p className="text-red-500 text-sm ml-4">{errors.studentIds.message}</p>
            )}
            <Table
              labels={HistorySearchLabels}
              data={data}
              keyField="studentId"
              showCheckbox={true}
              selectedIds={selectedStudents.map((s) => s.id)}
              onSelect={(id, checked) => {
                const student = data.find((s) => String(s.studentId) === id);
                if (!student) return;
                setSelectedStudents((prev) => {
                  const updated = checked
                    ? [...prev, { id, name: student.studentName }]
                    : prev.filter((x) => x.id !== id);
                  setValue(
                    'studentIds',
                    updated.map((s) => s.id),
                  );
                  return updated;
                });
              }}
            />
          </Loading>
        </div>

        {/* 右側：フォーム */}
        <Loading loading={createLoading}>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
            <Controller
              name="statusId"
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
        </Loading>
      </div>
      {selectedStudents.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-white shadow-xl border rounded-lg p-4 text-sm max-w-xs animate-slide-up">
          <div className="font-bold mb-2 text-gray-700">
            選択中の学生（{selectedStudents.length}）
          </div>
          <ul className="space-y-1 text-gray-600">
            {selectedStudents.map((s) => (
              <li key={s.id}>{s.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
