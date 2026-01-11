import { useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import type { ReactNode } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { handleApiError } from '@/utils/handleApiError';
import { authErrorGenerate } from '@/utils/authErrorGenerate';
import type { Role } from '@shared/types/role';

interface Props {
  children: ReactNode;
  allowedRoles?: Role[];
}

export const PageGuard = ({ children, allowedRoles }: Props) => {
  const navigate = useNavigate();

  const role = Cookies.get('role') as Role | undefined;

  const guardResult = useMemo(() => {
    // 未ログイン
    if (!role) {
      return handleApiError(authErrorGenerate(401));
    }

    // 権限不足
    if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(role)) {
      return handleApiError(authErrorGenerate(403));
    }

    return null; // 通過
  }, [role, allowedRoles]);

  useEffect(() => {
    if (!guardResult) return;

    toast.error(guardResult.message);

    if (guardResult.redirectTo) {
      navigate(guardResult.redirectTo);
    }
  }, [guardResult, navigate]);

  if (guardResult) {
    return null;
  }

  return <>{children}</>;
};
