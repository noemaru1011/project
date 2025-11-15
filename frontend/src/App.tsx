import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedContent from "@/hooks/useContent";
import { ROUTES } from "@/constants/routes";

import Layout from "@/components/layouts/Layout";
import Login from "@/pages/Auth/login";
import { HomePage } from "@/pages/Home/HomePage";
import { CategoryIndex } from "@/pages/CategoryPage";
import { SubCategoryIndex } from "@/pages/SubCategoryPage";
import { MinorCategoryIndex } from "@/pages/MInorCategoryPage";
import { DepartmentIndex } from "@/pages/DepartmentPage";
import { StatusIndex } from "@/pages/StatusPage";
import { StudentIndex } from "@/pages/StudentPage";
import { StudentCreate } from "@/pages/StudentPage/create";
import { StudentUpdate } from "@/pages/StudentPage/update";
import { StudentView } from "@/pages/StudentPage/view";
import { StudentChange } from "@/pages/Auth/changePassword";
import { HistoryCreate } from "@/pages/HistoryPage/create";

import { NotFound } from "@/pages/ErrorPage/NotFound";
import { ServerError } from "@/pages/ErrorPage/ServerError";
import { Forbidden } from "@/pages/ErrorPage/Forbidden";

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
          <ProtectedContent allowedRoles={["ADMIN", "STUDENT"]}>
            <HomePage />
          </ProtectedContent>
        }
      />
      <Route
        path={ROUTES.HISTORY.CREATE}
        element={
          <ProtectedContent allowedRoles={["ADMIN", "STUDENT"]}>
            <HistoryCreate />
          </ProtectedContent>
        }
      />
      {/* ここからaminのみしかし、student create以外は、page開くときにサーバーにリクエストするからわざわざフロントで記載する必要ない */}
      <Route path={ROUTES.STATUS.INDEX} element={<StatusIndex />} />
      <Route path={ROUTES.CATEGORY.INDEX} element={<CategoryIndex />} />
      <Route path={ROUTES.SUBCATEGORY.INDEX} element={<SubCategoryIndex />} />
      <Route
        path={ROUTES.MINORCategory.INDEX}
        element={<MinorCategoryIndex />}
      />
      <Route path={ROUTES.DEPARTMENT.INDEX} element={<DepartmentIndex />} />
      <Route path={ROUTES.STUDENT.INDEX} element={<StudentIndex />} />
      <Route
        path={ROUTES.STUDENT.CREATE}
        element={
          <ProtectedContent allowedRoles={["ADMIN"]}>
            <StudentCreate />
          </ProtectedContent>
        }
      />
      <Route path={ROUTES.STUDENT.UPDATE()} element={<StudentUpdate />} />
      <Route path={ROUTES.STUDENT.VIEW()} element={<StudentView />} />
      <Route path={ROUTES.STUDENT.CHANGE} element={<StudentChange />} />
    </Route>
  </Routes>
);

const App = () => (
  <Router>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      toastStyle={{ width: "500px" }}
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
