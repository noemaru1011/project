import { toast } from 'react-toastify';
import type { NavigateFunction } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import type { ApiResponse } from '@/interface/apiResponse';
import { APIMESSAGE } from '@shared/apiMessage';

const isApiResponse = (err: unknown): err is ApiResponse<unknown> => {
  return typeof err === 'object' && err !== null && 'status' in err && 'message' in err;
};

export const handleApiError = (err: unknown, navigate: NavigateFunction) => {
  if (!isApiResponse(err)) {
    // 想定外エラー
    navigate(ROUTES.ERROR.SERVER);
    toast.error(APIMESSAGE.INTERNAL_SERVER_ERROR);
    throw err;
  }

  const status = err.status ?? 0;
  const code = err.code;
  const message = err.message ?? APIMESSAGE.INTERNAL_SERVER_ERROR;

  switch (status) {
    case 0:
      navigate(ROUTES.ERROR.SERVER);
      toast.error(message);
      break;

    case 400:
      toast.error(message);
      break;

    case 401:
      if (code === APIMESSAGE.INVALID_CREDENTIALS) {
        toast.error(message);
      } else {
        navigate(ROUTES.AUTH.LOGIN);
        toast.error(message);
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
