import { useEffect } from 'react';
import type { ReactNode } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { handleApiError } from '@/utils/handleApiError';
import { APIMESSAGE } from '@shared/apiMessage';
import type { ApiResponse } from '@/interface/apiResponse';
import type { Role } from '@shared/role';

interface Props {
  children: ReactNode;
  allowedRoles?: Role[];
}

export const ProtectedContent = ({ children, allowedRoles }: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = Cookies.get('role') as Role | undefined;

    // 未ログイン
    if (!role) {
      const err: ApiResponse<unknown> = {
        status: 401,
        code: APIMESSAGE.TOKEN_ERROR,
        message: APIMESSAGE.TOKEN_ERROR,
      };

      handleApiError(err, navigate);
      return;
    }

    // 権限なし
    if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(role)) {
      const err: ApiResponse<unknown> = {
        status: 403,
        code: APIMESSAGE.FORBIDDEN,
        message: APIMESSAGE.FORBIDDEN,
      };

      handleApiError(err, navigate);
      return;
    }
  }, [allowedRoles, navigate]);

  return <>{children}</>;
};
