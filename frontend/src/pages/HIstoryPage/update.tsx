import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';
import { useUpdate } from '@/hooks/useUpdate';
import { useView } from '@/hooks/useView';
import { User, Library, Group } from 'lucide-react';

import { Input } from '@/components/atoms/Input';
import { Textarea } from '@/components/atoms/Textarea';
import { RadioGroup } from '@/components/molecules/RadioGroup';
import { Button } from '@/components/atoms/Button';
import { Select } from '@/components/atoms/Select';
import { Loading } from '@/components/atoms/Loading';
import { statusOptions } from '@/constants/statusOptions';
import { gradeOptions } from '@/constants/gradeOptions';
import { minorCategoryOptions } from '@/constants/minorCategoryOptions';
import { departmentOptions } from '@/constants/departmentOptions';

import { HistoryApi } from '@/api/historyApi';
import type { HistoryUpdateForm } from '@shared/schemas/history';
import { updateValidation } from '@shared/schemas/history';
import type { HistoryDetail } from '@/interface/history';

import { handleApiError } from '@/utils/handleApiError';
import { ROUTES } from '@/constants/routes';

export const HistoryUpdate = () => {
  const navigate = useNavigate();
  const { historyId } = useParams<{ historyId: string }>();
  const { update, loading } = useUpdate<HistoryUpdateForm>(HistoryApi.update);
  const { view } = useView<HistoryDetail>(HistoryApi.view);

  const [studentData, setStudentData] = useState<{
    studentName: string;
    grade: number;
    minorCategoryId: number;
    departmentId: number;
  }>({ studentName: '', grade: 0, minorCategoryId: 0, departmentId: 0 });

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateValidation),
  });

  // 初期値ロード
  useEffect(() => {
    if (!historyId) return;

    const fetch = async () => {
      try {
        console.log('historyId', historyId);
        const data: HistoryDetail = await view(historyId);
        console.log('data', data);
        setStudentData({
          studentName: data.studentName,
          grade: data.grade,
          minorCategoryId: data.minorCategoryId,
          departmentId: data.departmentId,
        });
        reset({
          other: data.other ?? '',
          startTime: data.startTime,
          endTime: data.endTime ?? '',
          updatedAt: data.updatedAt,
        });
      } catch (err: any) {
        handleApiError(err, navigate);
      }
    };

    fetch();
  }, [historyId]);

  // 更新処理
  const onSubmit = async (form: HistoryUpdateForm) => {
    try {
      if (!historyId) return;
      await update(historyId, form);
      toast.success('更新しました');
      navigate(ROUTES.HISTORY.INDEX);
    } catch (err: any) {
      handleApiError(err, navigate);
    }
  };

  return (
    <Loading loading={loading}>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-lg space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-800">履歴更新</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              id="studentName"
              label="学生名"
              type="text"
              leftIcon={<User className="size-5 text-indigo-500" />}
              value={studentData.studentName}
              disabled
            />
            <RadioGroup
              label="学年"
              name="grade"
              options={gradeOptions}
              value={String(studentData.grade)}
              disabled
            />
            <Select
              id="minorCategory"
              label="小分類名"
              options={minorCategoryOptions}
              leftIcon={<Group className="size-5 text-indigo-500" />}
              value={String(studentData.minorCategoryId)}
              disabled
            />
            <Select
              id="department"
              label="学科名"
              options={departmentOptions}
              leftIcon={<Library className="size-5 text-indigo-500" />}
              value={String(studentData.departmentId)}
              disabled
            />

            {/* 状況 */}
            <Controller
              name="statusId"
              control={control}
              render={({ field, fieldState }) => (
                <RadioGroup
                  label="状況"
                  name={field.name}
                  options={statusOptions}
                  value={field.value !== undefined ? String(field.value) : undefined}
                  onChange={(v) => field.onChange(Number(v))}
                  required
                  error={fieldState.error?.message}
                />
              )}
            />

            {/* 時間 */}
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
                helperText="未定の場合は設定しないでください"
                error={errors.endTime?.message}
                {...register('endTime')}
              />
            </div>

            {/* 備考 */}
            <Textarea
              id="other"
              label="備考欄"
              helperText="例：於：〇〇病院"
              error={errors.other?.message}
              {...register('other')}
            />
            <Input
              id="updatedAt"
              type="hidden"
              error={errors.updatedAt?.message}
              {...register('updatedAt')}
            />

            {/* ボタン */}
            <div className="flex justify-center gap-4 mt-4">
              <Button type="submit" variant="Update" className="w-32" />
              <Button
                type="button"
                variant="Back"
                onClick={() => navigate(ROUTES.HISTORY.INDEX)}
                className="w-32"
              />
            </div>
          </form>
        </div>
      </div>
    </Loading>
  );
};
