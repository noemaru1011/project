import { useEffect } from 'react';
import { toast } from 'react-toastify';
import type { ReactNode } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

interface Props {
  children: ReactNode;
  allowedRoles?: ('ADMIN' | 'STUDENT')[];
}

export const ProtectedContent = ({ children, allowedRoles }: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = Cookies.get('role') as 'ADMIN' | 'STUDENT' | undefined;

    if (!role) {
      // ログインしていない場合はログイン画面へ
      navigate(ROUTES.AUTH.LOGIN, { replace: true });
      toast.error('ログインしてください');
      return;
    }

    if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(role as any)) {
      // 権限なしの場合は Forbidden 画面へ
      navigate(ROUTES.ERROR.FORBIDDEN, { replace: true });
      toast.error('権限がありません');
      return;
    }
  }, [allowedRoles, navigate]);

  return <>{children}</>;
};
