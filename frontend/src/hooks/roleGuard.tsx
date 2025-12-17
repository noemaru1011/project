import { useEffect } from 'react';
import type { ReactNode } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { handleApiError } from '@/utils/handleApiError';
import { authErrorGenerate } from '@/utils/authErrorGenerate';
import type { Role } from '@shared/role';

interface Props {
  children: ReactNode;
  allowedRoles?: Role[];
}

export const RoleGuard = ({ children, allowedRoles }: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = Cookies.get('role') as Role | undefined;

    // 未ログイン
    if (!role) {
      handleApiError(authErrorGenerate(401), navigate);
      return;
    }

    // 権限なし
    if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(role)) {
      handleApiError(authErrorGenerate(403), navigate);
      return;
    }
  }, [allowedRoles, navigate]);

  return <>{children}</>;
};
