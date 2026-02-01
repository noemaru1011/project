import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toast } from '@/components/ui/Toast/Toast';
import { ROUTES } from '@/routes/routes';
import { PageGuard } from '@/components/guard/PageGuard';

import { BaseLayout } from '@/components/layouts/BaseLayout';
import { Login } from '@/features/auth/pages/login';
import { HomePage } from '@/pages/home/home';
import { StudentIndexPage } from '@/features/student/pages/';
import { StudentCreatePage } from '@/features/student/pages/create';
import { StudentUpdatePage } from '@/features/student/pages/update';
import { StudentViewPage } from '@/features/student/pages/view';

import { ChangePassword } from '@/features/auth/pages/updatePassword';
import { HistoryIndexPage } from '@/features/history/pages';
import { HistoryCreatePage } from '@/features/history/pages/create';
import { HistoryUpdatePage } from '@/features/history/pages/update';
import { HistoryDeletePage } from '@/features/history/pages/delete';

import { NotFoundPage } from '@/pages/error/notFound';
import { ServerErrorPage } from '@/pages/error/serverError';
import { ForbiddenPage } from '@/pages/error/forbidden';

const AppRoutes = () => (
  <Routes>
    <Route path={ROUTES.AUTH.LOGIN} element={<Login />} />
    <Route element={<BaseLayout />}>
      {/* エラー画面 */}
      <Route path={ROUTES.ERROR.SERVER} element={<ServerErrorPage />} />
      <Route path={ROUTES.ERROR.FORBIDDEN} element={<ForbiddenPage />} />
      <Route path={ROUTES.ERROR.NOTFOUND} element={<NotFoundPage />} />

      {/* 共通画面*/}
      <Route
        path={ROUTES.HOME}
        element={
          <PageGuard allowedRoles={['ADMIN', 'STUDENT']}>
            <HomePage />
          </PageGuard>
        }
      />
      <Route
        path={ROUTES.HISTORY.INDEX}
        element={
          <PageGuard allowedRoles={['ADMIN', 'STUDENT']}>
            <HistoryIndexPage />
          </PageGuard>
        }
      />
      <Route
        path={ROUTES.HISTORY.CREATE}
        element={
          <PageGuard allowedRoles={['ADMIN', 'STUDENT']}>
            <HistoryCreatePage />
          </PageGuard>
        }
      />
      <Route path={ROUTES.HISTORY.UPDATE()} element={<HistoryUpdatePage />} />
      <Route path={ROUTES.HISTORY.DELETE()} element={<HistoryDeletePage />} />
      {/* 学生のみ */}
      <Route
        path={ROUTES.AUTH.PASSWORD_CHANGE}
        element={
          <PageGuard allowedRoles={['STUDENT']}>
            <ChangePassword />
          </PageGuard>
        }
      />

      {/* aminのみ*/}
      <Route
        path={ROUTES.STUDENT.INDEX}
        element={
          <PageGuard allowedRoles={['ADMIN']}>
            <StudentIndexPage />
          </PageGuard>
        }
      />
      <Route
        path={ROUTES.STUDENT.CREATE}
        element={
          <PageGuard allowedRoles={['ADMIN']}>
            <StudentCreatePage />
          </PageGuard>
        }
      />
      <Route path={ROUTES.STUDENT.UPDATE()} element={<StudentUpdatePage />} />
      <Route path={ROUTES.STUDENT.VIEW()} element={<StudentViewPage />} />
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
