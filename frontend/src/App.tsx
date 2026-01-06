import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toast } from '@/components/ui/Toast/Toast';
import { PageGuard } from '@/components/layouts/PageGuard';
import { ROUTES } from '@/routes/routes';
import { ROLE } from '@shared/role';

import Layout from '@/components/layouts/Layout';
import { Login } from '@/features/auth/pages/login';
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
import { ChangePassword } from '@/features/auth/pages/updatePassword';
import { HistoryIndexPage } from '@/features/history/pages';
import { HistoryCreatePage } from '@/features/history/pages/create';
import { HistoryUpdatePage } from '@/features/history/pages/update';
import { HistoryDeletePage } from '@/features/history/pages/delete';

import { NotFound } from '@/pages/error/notFound';
import { ServerError } from '@/pages/error/serverError';
import { Forbidden } from '@/pages/error/forbidden';

const AppRoutes = () => (
  <Routes>
    <Route path={ROUTES.AUTH.LOGIN} element={<Login />} />
    <Route element={<Layout />}>
      {/* エラー画面 */}
      <Route path={ROUTES.ERROR.SERVER} element={<ServerError />} />
      <Route path={ROUTES.ERROR.FORBIDDEN} element={<Forbidden />} />
      <Route path={ROUTES.ERROR.NOTFOUND} element={<NotFound />} />
      {/* ページを開くときリクエスト不要画面なのでフロントで制御 */}
      <Route
        path={ROUTES.HOME}
        element={
          <PageGuard allowedRoles={[ROLE.ADMIN, ROLE.STUDENT]}>
            <HomePage />
          </PageGuard>
        }
      />
      <Route
        path={ROUTES.HISTORY.CREATE}
        element={
          <PageGuard allowedRoles={[ROLE.ADMIN, ROLE.STUDENT]}>
            <HistoryCreatePage />
          </PageGuard>
        }
      />

      <Route
        path={ROUTES.HISTORY.INDEX}
        element={
          <PageGuard allowedRoles={[ROLE.ADMIN, ROLE.STUDENT]}>
            <HistoryIndexPage />
          </PageGuard>
        }
      />

      <Route path={ROUTES.HISTORY.UPDATE()} element={<HistoryUpdatePage />} />
      <Route path={ROUTES.HISTORY.DELETE()} element={<HistoryDeletePage />} />
      <Route
        path={ROUTES.AUTH.PASSWORD_CHANGE}
        element={
          <PageGuard allowedRoles={[ROLE.STUDENT]}>
            <ChangePassword />
          </PageGuard>
        }
      />
      {/* ここからaminのみしかし、page開くと同時にサーバー通信しない場合はフロントでも制御 */}
      <Route path={ROUTES.STATUS.INDEX} element={<StatusIndexPage />} />
      <Route path={ROUTES.CATEGORY.INDEX} element={<CategoryIndexPage />} />
      <Route path={ROUTES.SUBCATEGORY.INDEX} element={<SubCategoryIndexPage />} />
      <Route path={ROUTES.MINORCATEGORY.INDEX} element={<MinorCategoryIndexPage />} />
      <Route path={ROUTES.DEPARTMENT.INDEX} element={<DepartmentIndexPage />} />
      <Route
        path={ROUTES.STUDENT.INDEX}
        element={
          <PageGuard allowedRoles={[ROLE.ADMIN]}>
            <StudentIndexPage />
          </PageGuard>
        }
      />
      <Route
        path={ROUTES.STUDENT.CREATE}
        element={
          <PageGuard allowedRoles={[ROLE.ADMIN]}>
            <StudentCreatePage />
          </PageGuard>
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
    <Toast />
    <AppRoutes />
  </Router>
);

export default App;
