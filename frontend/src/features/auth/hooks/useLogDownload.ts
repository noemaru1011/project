import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authApi } from '@/features/auth/api';
import { handleApiErrorWithUI, downloadBlob } from '@/utils';

export function useLogDownload() {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: () => authApi.logDownload(),

    onSuccess: (blob) => {
      downloadBlob(blob, 'logs.zip');
      toast.success('ログをダウンロードしました');
    },

    onError: (err) => {
      handleApiErrorWithUI(err, navigate);
    },
  });

  return {
    logDownload: mutation.mutate,
    loading: mutation.isPending,
  };
}
