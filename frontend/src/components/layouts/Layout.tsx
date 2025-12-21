import { Outlet } from 'react-router-dom';
import { Header } from '@/components/ui/Header/Header';

//フッター作るならここに追加
const Layout = () => {
  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
