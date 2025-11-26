import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import type { ApiResponse } from '@/interface/apiResponse';

export const useErrorHandler = () => {
  const navigate = useNavigate();

  return useCallback(
    (err: ApiResponse<unknown>) => {
      const status = err.status ?? 0;
      const code = err.code;
      const message = err.message ?? '予期せぬエラーが発生しました';

      if (status === 0) {
        navigate(ROUTES.ERROR.SERVER);
        toast.error(message);
        return;
      }

      if (status === 400) {
        switch (code) {
          case 'INVALID_OLD_PASSWORD':
            toast.error(message);
            return;
          default:
            console.log('ここ通るはず');
            toast.error(message);
            return;
        }
      }

      if (status === 401) {
        switch (code) {
          case 'INVALID_CREDENTIALS':
            toast.error(message);
            return;
          case 'TOKEN_EXPIRED':
            navigate(ROUTES.AUTH.LOGIN);
            toast.error(message);
            return;
          case 'INVALID_TOKEN':
            navigate(ROUTES.AUTH.LOGIN);
            toast.error(message);
            return;
          default:
            navigate(ROUTES.AUTH.LOGIN);
            toast.error(message);
            return;
        }
      }

      if (status === 403) {
        navigate(ROUTES.ERROR.FORBIDDEN);
        toast.error(message);
        return;
      }

      if (status === 404) {
        navigate(ROUTES.ERROR.NOTFOUND);
        toast.error(message);
        return;
      }

      if (status >= 500) {
        navigate(ROUTES.ERROR.SERVER);
        toast.error(message);
        return;
      }
      navigate(ROUTES.ERROR.SERVER);
      toast.error(message);
    },
    [navigate],
  );
};
