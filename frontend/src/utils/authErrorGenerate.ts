import { APIMESSAGE } from '@shared/constants/apiMessage';
import type { ApiResponse } from '@shared/types/api';
import type { ApiMessageCode } from '@shared/constants/apiMessage';

//フロントのみで401と403を再現する関数
export const authErrorGenerate = (status: 401 | 403): ApiResponse<unknown> => {
  const code: ApiMessageCode = status === 401 ? 'TOKEN_ERROR' : 'FORBIDDEN';

  return {
    status,
    code,
    data: null,
    message: status === 401 ? APIMESSAGE.TOKEN_ERROR : APIMESSAGE.FORBIDDEN,
  };
};
