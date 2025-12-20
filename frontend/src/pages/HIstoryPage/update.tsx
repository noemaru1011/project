import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';
import { useUpdate } from '@/hooks/useUpdate';
import { useView } from '@/hooks/useView';

import { Input } from '@/components/atoms/Input';
import { Textarea } from '@/components/atoms/Textarea';
import { Checkbox } from '@/components/atoms/Checkbox';
import { RadioGroup } from '@/components/molecules/RadioGroup';
import { Button } from '@/components/atoms/Button';
import { Select } from '@/components/atoms/Select';
import { Loading } from '@/components/atoms/Loading';
import { statusOptions } from '@/constants/statusOptions';
import { gradeOptions } from '@/constants/gradeOptions';
import { minorCategoryOptions } from '@/features/minorCategory/constants/options';
import { departmentOptions } from '@/features/department/constants/options';

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
        const data: HistoryDetail = await view(historyId);
        setStudentData({
          studentName: data.studentName,
          grade: data.grade,
          minorCategoryId: data.minorCategoryId,
          departmentId: data.departmentId,
        });
        reset({
          statusId: data.statusId,
          other: data.other ?? '',
          startTime: data.startTime,
          endTime: data.endTime ?? '',
          validFlag: data.validFlag,
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
      const res = await update(historyId, form);
      toast.success(res.message);
      navigate(ROUTES.HISTORY.INDEX);
    } catch (err: any) {
      handleApiError(err, navigate);
    }
  };

  return (
    <Loading loading={loading}>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-4xl  p-8 bg-white rounded-2xl shadow-lg space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-800">履歴更新</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* ===== 左：変更不可 ===== */}
              <section className="space-y-4 p-4 bg-gray-50 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-700">基本情報（変更不可）</h3>

                <Input
                  id="studentName"
                  label="学生名"
                  type="text"
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
                  value={String(studentData.minorCategoryId)}
                  disabled
                />

                <Select
                  id="department"
                  label="学科名"
                  options={departmentOptions}
                  value={String(studentData.departmentId)}
                  disabled
                />
              </section>

              {/* ===== 右：編集可能 ===== */}
              <section className="space-y-6 p-4 bg-white rounded-xl">
                <h3 className="text-lg font-semibold text-gray-700">更新内容</h3>

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

                <div className="flex flex-col gap-4">
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
                  />
                </div>

                <Textarea
                  id="other"
                  label="備考欄"
                  error={errors.other?.message}
                  {...register('other')}
                />

                <Checkbox
                  id="validFlag"
                  label="有効フラグ"
                  error={errors.validFlag?.message}
                  {...register('validFlag')}
                />

                <Input
                  id="updatedAt"
                  type="hidden"
                  error={errors.updatedAt?.message}
                  {...register('updatedAt')}
                />
              </section>
            </div>

            {/* ===== ボタン ===== */}
            <div className="flex justify-center gap-4 mt-6">
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
