import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';
import { useUpdate } from '@/hooks/useUpdate';
import { useView } from '@/hooks/useView';

import { Input } from '@/components/atoms/Input';
import { Textarea } from '@/components/atoms/Textarea';
import { RadioGroup } from '@/components/molecules/RadioGroup';
import { Button } from '@/components/atoms/Button';
import { Loading } from '@/components/atoms/Loading';
import { statusOptions } from '@/constants/statusOptions';

import { HistoryApi } from '@/api/historyApi';
import type { HistoryForm } from '@shared/schemas/history';
import { validation } from '@shared/schemas/history';
import type { HistoryResult } from '@/interface/history';

import { handleApiError } from '@/utils/handleApiError';
import { ROUTES } from '@/constants/routes';

export const HistoryUpdate = () => {
  const navigate = useNavigate();
  const { historyId } = useParams<{ historyId: string }>();

  const { update, loading } = useUpdate<HistoryForm>(HistoryApi.update);
  const { view } = useView<HistoryResult>(HistoryApi.view);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<HistoryForm>({
    resolver: zodResolver(validation),
  });

  // 初期値ロード
  useEffect(() => {
    if (!historyId) return;

    const fetch = async () => {
      try {
        const data = await view(historyId);

        reset({
          StatusName data.statusName,
          other: data.other ?? '',
          startTime: data.startTime,
          endTime: data.endTime ?? undefined,
        });
      } catch (err:any) {
        handleApiError(err, navigate);
      }
    };

    fetch();
  }, [historyId]);

  // 更新処理
  const onSubmit = async (form: HistoryForm) => {
    try {
      if (!historyId) return;
      await update(historyId, form);
      toast.success('更新しました');
      navigate(ROUTES.HISTORY.INDEX);
    } catch (err:any) {
      handleApiError(err, navigate);
    }
  };

  return (
    <Loading loading={loading}>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-lg space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-800">履歴更新</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* 状況 */}
            <Controller
              name="StatusId"
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
