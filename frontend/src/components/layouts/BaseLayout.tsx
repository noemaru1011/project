import { Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/auchContext';
import { HeaderLayout } from './HeaderLayout';

//フッター作るならここに追加
export const BaseLayout = () => {
  const { role } = useAuth();
  const isLoggedIn = role === 'STUDENT' || role === 'ADMIN';

  return (
    <>
      {isLoggedIn && <HeaderLayout />}
      <main>
        <Outlet />
      </main>
    </>
  );
};
