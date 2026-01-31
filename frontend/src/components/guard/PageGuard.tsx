import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAuth } from '@/contexts/authContext';
import type { Role } from '@shared/models/common';
import { handleApiErrorWithUI, authErrorGenerate } from '@/utils';

interface Props {
  children: ReactNode;
  allowedRoles?: Role[];
}

/**
 * 権限に基づいたアクセス制限を行うガードコンポーネント
 */
export const PageGuard = ({ children, allowedRoles }: Props) => {
  const { role } = useAuth();
  const navigate = useNavigate();

  // 1. 判定ロジック
  const isNotLoggedIn = !role;
  const isUnauthorized =
    allowedRoles && allowedRoles.length > 0 && role && !allowedRoles.includes(role);

  useEffect(() => {
    // 未ログインの場合
    if (isNotLoggedIn) {
      handleApiErrorWithUI(authErrorGenerate(401), navigate);
      return;
    }

    // 権   限不足の場合
    if (isUnauthorized) {
      handleApiErrorWithUI(authErrorGenerate(403), navigate);
      return;
    }
  }, [isNotLoggedIn, isUnauthorized, navigate]);

  // 判定中、またはエラー時は何も表示しない（チラつき防止）
  if (isNotLoggedIn || isUnauthorized) {
    return null;
  }

  // 権限に問題がなければ子コンポーネントを表示
  return <>{children}</>;
};
