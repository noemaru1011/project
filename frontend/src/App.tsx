import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RoleGuard } from '@/hooks/roleGuard';
import { ROUTES } from '@/constants/routes';
import { ROLE } from '@shared/role';

import Layout from '@/components/layouts/Layout';
import { Login } from '@/pages/auth/login';
import { HomePage } from '@/pages/home/homePage';
import { CategoryIndex } from '@/features/category/pages';
import { SubCategoryIndex } from '@/pages/subCategoryPage';
import { MinorCategoryIndex } from '@/pages/minorCategoryPage';
import { DepartmentIndex } from '@/pages/departmentPage';
import { StatusIndex } from '@/pages/statusPage';
import { StudentIndex } from '@/pages/studentPage';
import { StudentCreate } from '@/pages/studentPage/create';
import { StudentUpdate } from '@/pages/studentPage/update';
import { StudentView } from '@/pages/studentPage/view';
import { StudentDelete } from './pages/studentPage/delete';
import { ChangePassword } from '@/pages/passwordPage/update';
import { HistoryIndex } from '@/pages/historyPage';
import { HistoryCreate } from '@/pages/historyPage/create';
import { HistoryUpdate } from '@/pages/historyPage/update';
import { HistoryDelete } from '@/pages/historyPage/delete';

import { NotFound } from '@/pages/errorPage/notFound';
import { ServerError } from '@/pages/errorPage/serverError';
import { Forbidden } from '@/pages/errorPage/forbidden';

const AppRoutes = () => (
  <Routes>
    {/* ヘッダーなし */}
    <Route path={ROUTES.AUTH.LOGIN} element={<Login />} />
    {/* エラー画面 */}
    <Route path={ROUTES.ERROR.SERVER} element={<ServerError />} />
    <Route path={ROUTES.ERROR.FORBIDDEN} element={<Forbidden />} />
    <Route path={ROUTES.ERROR.NOTFOUND} element={<NotFound />} />

    {/* ヘッダーあり */}
    <Route element={<Layout />}>
      {/* リクエスト不要画面なのでフロントで制御 */}
      <Route
        path={ROUTES.HOME}
        element={
          <RoleGuard allowedRoles={[ROLE.ADMIN, ROLE.STUDENT]}>
            <HomePage />
          </RoleGuard>
        }
      />
      <Route
        path={ROUTES.HISTORY.CREATE}
        element={
          <RoleGuard allowedRoles={[ROLE.ADMIN, ROLE.STUDENT]}>
            <HistoryCreate />
          </RoleGuard>
        }
      />
      <Route
        path={ROUTES.HISTORY.INDEX}
        element={
          <RoleGuard allowedRoles={[ROLE.ADMIN, ROLE.STUDENT]}>
            <HistoryIndex />
          </RoleGuard>
        }
      />
      <Route path={ROUTES.HISTORY.UPDATE()} element={<HistoryUpdate />} />
      <Route path={ROUTES.HISTORY.DELETE()} element={<HistoryDelete />} />
      <Route
        path={ROUTES.STUDENT.CHANGE}
        element={
          <RoleGuard allowedRoles={[ROLE.ADMIN, ROLE.STUDENT]}>
            <ChangePassword />
          </RoleGuard>
        }
      />
      {/* ここからaminのみしかし、page開くと同時にサーバー通信しない場合はフロントでも制御 */}
      <Route path={ROUTES.STATUS.INDEX} element={<StatusIndex />} />
      <Route path={ROUTES.CATEGORY.INDEX} element={<CategoryIndex />} />
      <Route path={ROUTES.SUBCATEGORY.INDEX} element={<SubCategoryIndex />} />
      <Route path={ROUTES.MINORCategory.INDEX} element={<MinorCategoryIndex />} />
      <Route path={ROUTES.DEPARTMENT.INDEX} element={<DepartmentIndex />} />
      <Route
        path={ROUTES.STUDENT.INDEX}
        element={
          <RoleGuard allowedRoles={[ROLE.ADMIN]}>
            <StudentIndex />
          </RoleGuard>
        }
      />
      <Route
        path={ROUTES.STUDENT.CREATE}
        element={
          <RoleGuard allowedRoles={[ROLE.ADMIN]}>
            <StudentCreate />
          </RoleGuard>
        }
      />
      <Route path={ROUTES.STUDENT.UPDATE()} element={<StudentUpdate />} />
      <Route path={ROUTES.STUDENT.VIEW()} element={<StudentView />} />
      <Route path={ROUTES.STUDENT.DELETE()} element={<StudentDelete />} />
    </Route>
  </Routes>
);

const App = () => (
  <Router>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      toastStyle={{ width: '500px' }}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    <AppRoutes />
  </Router>
);

export default App;
