import { toast } from 'react-toastify';
import type { NavigateFunction } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import type { ApiResponse } from '@/interface/apiResponse';

export const handleApiError = (err: ApiResponse<unknown>, navigate: NavigateFunction) => {
  const status = err.status ?? 0;
  const code = err.code;
  const message = err.message ?? '予期せぬエラーが発生しました';

  switch (status) {
    case 0: // ネットワークエラーなど
      navigate(ROUTES.ERROR.SERVER);
      toast.error(message);
      break;

    case 400:
      switch (code) {
        case 'INVALID_OLD_PASSWORD':
          toast.error(message);
          break;
        default:
          toast.error(message);
          break;
      }
      break;

    case 401:
      switch (code) {
        case 'INVALID_CREDENTIALS':
          toast.error(message);
          break;
        case 'TOKEN_EXPIRED':
        case 'INVALID_TOKEN':
        default:
          navigate(ROUTES.AUTH.LOGIN);
          toast.error(message);
          break;
      }
      break;

    case 403:
      navigate(ROUTES.ERROR.FORBIDDEN);
      toast.error(message);
      break;

    case 404:
      navigate(ROUTES.ERROR.NOTFOUND);
      toast.error(message);
      break;

    default:
      if (status >= 500) {
        navigate(ROUTES.ERROR.SERVER);
      }
      toast.error(message);
      break;
  }

  return { status, code, message };
};
