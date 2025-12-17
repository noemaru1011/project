import { APIMESSAGE } from '@shared/apiMessage';
import type { ApiResponse } from '@/interface/apiResponse';

export const authErrorGenerate = (status: 401 | 403): ApiResponse<unknown> => ({
  status,
  code: status === 401 ? APIMESSAGE.TOKEN_ERROR : APIMESSAGE.FORBIDDEN,
  message: status === 401 ? APIMESSAGE.TOKEN_ERROR : APIMESSAGE.FORBIDDEN,
});
