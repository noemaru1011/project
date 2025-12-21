import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RoleGuard } from '@/hooks/roleGuard';
import { ROUTES } from '@/constants/routes';
import { ROLE } from '@shared/role';

import Layout from '@/components/layouts/Layout';
import { Login } from '@/pages/auth/login';
import { HomePage } from '@/pages/home/homePage';
import { CategoryIndexPage } from '@/features/category/pages';
import { SubCategoryIndexPage } from '@/features/subCategory/pages';
import { MinorCategoryIndexPage } from '@/features/minorCategory/pages';
import { DepartmentIndexPage } from '@/features/department/pages';
import { StatusIndexPage } from '@/features/status/pages';
import { StudentIndexPage } from '@/features/student/pages/';
import { StudentCreatePage } from '@/features/student/pages/create';
import { StudentUpdatePage } from '@/features/student/pages/update';
import { StudentViewPage } from '@/features/student/pages/view';
import { StudentDeletePage } from '@/features/student/pages/delete';
import { ChangePassword } from '@/pages/passwordPage/update';
import { HistoryIndex } from '@/pages/historyPage';
import { HistoryCreate } from '@/pages/historyPage/create';
import { HistoryUpdate } from '@/pages/historyPage/update';
import { HistoryDelete } from '@/pages/historyPage/delete';

import { NotFound } from '@/pages/error/notFound';
import { ServerError } from '@/pages/error/serverError';
import { Forbidden } from '@/pages/error/forbidden';

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
      <Route path={ROUTES.STATUS.INDEX} element={<StatusIndexPage />} />
      <Route path={ROUTES.CATEGORY.INDEX} element={<CategoryIndexPage />} />
      <Route path={ROUTES.SUBCATEGORY.INDEX} element={<SubCategoryIndexPage />} />
      <Route path={ROUTES.MINORCategory.INDEX} element={<MinorCategoryIndexPage />} />
      <Route path={ROUTES.DEPARTMENT.INDEX} element={<DepartmentIndexPage />} />
      <Route
        path={ROUTES.STUDENT.INDEX}
        element={
          <RoleGuard allowedRoles={[ROLE.ADMIN]}>
            <StudentIndexPage />
          </RoleGuard>
        }
      />
      <Route
        path={ROUTES.STUDENT.CREATE}
        element={
          <RoleGuard allowedRoles={[ROLE.ADMIN]}>
            <StudentCreatePage />
          </RoleGuard>
        }
      />
      <Route path={ROUTES.STUDENT.UPDATE()} element={<StudentUpdatePage />} />
      <Route path={ROUTES.STUDENT.VIEW()} element={<StudentViewPage />} />
      <Route path={ROUTES.STUDENT.DELETE()} element={<StudentDeletePage />} />
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
