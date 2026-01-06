import { Outlet } from 'react-router-dom';
import { Header } from '@/components/ui/Header/Header';
import { UiVisibility } from '@/hooks/ui/uiVisibility';

//フッター作るならここに追加
const Layout = () => {
  return (
    <>
      <UiVisibility allowedRoles={['ADMIN', 'STUDENT']}>
        <Header />
      </UiVisibility>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
