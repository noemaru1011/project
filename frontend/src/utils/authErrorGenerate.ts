import { APIMESSAGE } from '@shared/apiMessage';
import type { ApiResponse } from '@/api/types';
import type { ApiMessageKey } from '@shared/apiMessage';

//フロントのみで401と403を再現する関数
export const authErrorGenerate = (status: 401 | 403): ApiResponse<unknown> => {
  const code: ApiMessageKey = status === 401 ? 'TOKEN_ERROR' : 'FORBIDDEN';

  return {
    status,
    code,
    message: status === 401 ? APIMESSAGE.TOKEN_ERROR : APIMESSAGE.FORBIDDEN,
  };
};
