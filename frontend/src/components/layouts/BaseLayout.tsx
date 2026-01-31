import { Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/authContext';
import { HeaderLayout } from './HeaderLayout';

//フッター作るならここに追加
export const BaseLayout = () => {
  const { role } = useAuth();
  const isLoggedIn = role === 'STUDENT' || role === 'ADMIN';

  return (
    <>
      {/* ログインしている場合のみヘッダーを表示 */}
      {isLoggedIn && <HeaderLayout />}
      <main>
        <Outlet />
      </main>
    </>
  );
};
