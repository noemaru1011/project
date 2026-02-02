import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {
  HistoryCreateForm,
  SelectedStudentsFloat,
  StudentTable,
} from '@/features/history/components';
import { StudentSearchForm } from '@/features/student/components';
import { useSearchStudents } from '@/features/student/hooks/useSearchStudents';
import { useCreateHistory } from '@/features/history/hooks/useCreateHistory';
import { ROUTES } from '@/routes/routes';
import { handleApiErrorWithUI } from '@/utils';
import type { HistoryCreateInput } from '@shared/models/history';

export const HistoryCreatePage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [selectedStudents, setSelectedStudents] = useState<{ id: string; name: string }[]>([]);

  const { students, isLoading, search } = useSearchStudents();
  const { createHistory, isPending } = useCreateHistory();

  // --- ハンドラ: 履歴作成 ---
  const handleSubmit = (data: HistoryCreateInput) => {
    createHistory(data, {
      onSuccess: (res) => {
        // キャッシュを古いものとして無効化（一覧が再取得される）
        queryClient.invalidateQueries({ queryKey: ['histories'] });

        toast.success(res.message);
        navigate(ROUTES.HISTORY.INDEX);
      },
      onError: (err) => handleApiErrorWithUI(err, navigate),
    });
  };

  return (
    <div className="m-4">
      <h2 className="text-center text-2xl font-bold mt-4">履歴作成</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
        {/* 左カラム: 学生検索と選択 */}
        <div>
          <StudentSearchForm onSearch={search} loading={isLoading} />

          <StudentTable
            loading={isLoading}
            data={students}
            selectedStudents={selectedStudents}
            onChangeSelected={setSelectedStudents}
          />
        </div>

        {/* 右カラム: 履歴入力フォーム（追従） */}
        <div className="sticky top-4 self-start">
          <HistoryCreateForm
            onSubmit={handleSubmit}
            loading={isPending}
            selectedStudents={selectedStudents}
          />
        </div>
      </div>

      {/* 選択中の学生を通知するフロート表示 */}
      {selectedStudents.length > 0 && <SelectedStudentsFloat students={selectedStudents} />}
    </div>
  );
};
