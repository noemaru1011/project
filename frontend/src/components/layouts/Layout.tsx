import { Outlet } from 'react-router-dom';
import { Header } from '@/components/organisms/Header';

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
