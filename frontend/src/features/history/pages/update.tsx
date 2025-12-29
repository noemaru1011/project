import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';
import { useUpdate } from '@/hooks/useUpdate';
import { useView } from '@/hooks/useView';

import { Input } from '@/components/ui/Input/Input';
import { StudentNameInput } from '@/features/student/components';
import { GradeRadioGroup } from '@/features/grade/components';
import { MinorCategorySelect } from '@/features/minorCategory/components';
import { DepartmentSelect } from '@/features/department/components';
import { StatusRadioGroup } from '@/features/status/components';
import {
  StartTimeInput,
  EndTimeInput,
  OtherTextarea,
  VailFlagCheckbox,
} from '@/features/history/components';
import { Button } from '@/components/ui/Button/Button';
import { Loading } from '@/components/ui/Loading/Loading';

import { historyApi } from '@/features/history/';
import type { HistoryUpdateForm } from '@shared/schemas/history';
import { updateValidation } from '@shared/schemas/history';
import type { HistoryDetail } from '@/features/history/types';

import { handleApiError } from '@/utils/handleApiError';
import { ROUTES } from '@/constants/routes';

export const HistoryUpdatePage = () => {
  const navigate = useNavigate();
  const { historyId } = useParams<{ historyId: string }>();
  const { update, loading } = useUpdate<HistoryUpdateForm>(historyApi.update);
  const { view } = useView<HistoryDetail>(historyApi.view);

  const [studentData, setStudentData] = useState<{
    studentName: string;
    grade: string;
    minorCategoryId: string;
    departmentId: string;
  }>({ studentName: '', grade: '', minorCategoryId: '', departmentId: '' });

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
      } catch (err) {
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
    } catch (err) {
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

                <StudentNameInput value={studentData.studentName} disabled />

                <GradeRadioGroup name="grade" value={String(studentData.grade)} disabled />

                <MinorCategorySelect value={String(studentData.minorCategoryId)} disabled />

                <DepartmentSelect value={String(studentData.departmentId)} disabled />
              </section>

              {/* ===== 右：編集可能 ===== */}
              <section className="space-y-6 p-4 bg-white rounded-xl">
                <h3 className="text-lg font-semibold text-gray-700">更新内容</h3>

                <Controller
                  name="statusId"
                  control={control}
                  render={({ field, fieldState }) => (
                    <StatusRadioGroup
                      name={field.name}
                      value={field.value !== undefined ? String(field.value) : undefined}
                      onChange={(value) => field.onChange(value)}
                      error={fieldState.error?.message}
                    />
                  )}
                />

                <div className="flex flex-col gap-4">
                  <StartTimeInput error={errors.startTime?.message} {...register('startTime')} />
                  <EndTimeInput error={errors.endTime?.message} {...register('endTime')} />
                </div>

                <OtherTextarea error={errors.other?.message} {...register('other')} />

                <VailFlagCheckbox error={errors.validFlag?.message} {...register('validFlag')} />

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
