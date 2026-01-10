import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toast } from '@/components/ui/Toast/Toast';
import { ROUTES } from '@/routes/routes';

import { BaseLayout } from '@/components/layouts/BaseLayout';
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
    <Route element={<BaseLayout />}>
      {/* エラー画面 */}
      <Route path={ROUTES.ERROR.SERVER} element={<ServerError />} />
      <Route path={ROUTES.ERROR.FORBIDDEN} element={<Forbidden />} />
      <Route path={ROUTES.ERROR.NOTFOUND} element={<NotFound />} />

      {/* 共通画面*/}
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.HISTORY.CREATE} element={<HistoryCreatePage />} />
      <Route path={ROUTES.HISTORY.INDEX} element={<HistoryIndexPage />} />
      <Route path={ROUTES.HISTORY.UPDATE()} element={<HistoryUpdatePage />} />
      <Route path={ROUTES.HISTORY.DELETE()} element={<HistoryDeletePage />} />
      {/* 学生のみ */}
      <Route path={ROUTES.AUTH.PASSWORD_CHANGE} element={<ChangePassword />} />

      {/* aminのみ*/}
      <Route path={ROUTES.STATUS.INDEX} element={<StatusIndexPage />} />
      <Route path={ROUTES.CATEGORY.INDEX} element={<CategoryIndexPage />} />
      <Route path={ROUTES.SUBCATEGORY.INDEX} element={<SubCategoryIndexPage />} />
      <Route path={ROUTES.MINORCATEGORY.INDEX} element={<MinorCategoryIndexPage />} />
      <Route path={ROUTES.DEPARTMENT.INDEX} element={<DepartmentIndexPage />} />
      <Route path={ROUTES.STUDENT.INDEX} element={<StudentIndexPage />} />
      <Route path={ROUTES.STUDENT.CREATE} element={<StudentCreatePage />} />
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
