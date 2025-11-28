import { Outlet } from 'react-router-dom';
import { Header } from '@/components/organisms/Header';

//フッター作るならここに追加
const Layout = () => {
  return (
    <>
      <Header />

      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
