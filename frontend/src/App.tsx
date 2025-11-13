import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ROUTES } from "@/constants/routes";

import Layout from "@/components/layouts/Layout";
import Login from "@/pages/Auth/login";
import HomePage from "@/pages/Home/HomePage";
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

import { NotFound } from "@/pages/ErrorPage/NotFound";
import { ServerError } from "@/pages/ErrorPage/ServerError";
import { Forbidden } from "@/pages/ErrorPage/Forbidden";

const AppRoutes = () => (
  <Routes>
    <Route path={ROUTES.Auth.LOGIN} element={<Login />} />
    {/* エラー画面 */}
    <Route path={ROUTES.Status.INDEX} element={<StatusIndex />} />
    <Route path={ROUTES.Error.SERVER} element={<ServerError />} />
    <Route path={ROUTES.Error.FORBIDDEN} element={<Forbidden />} />
    <Route path={ROUTES.Error.NOTFOUND} element={<NotFound />} />

    <Route element={<Layout />}>
      <Route path={ROUTES.Category.INDEX} element={<CategoryIndex />} />
      <Route path={ROUTES.SubCategory.INDEX} element={<SubCategoryIndex />} />
      <Route
        path={ROUTES.MinorCategory.INDEX}
        element={<MinorCategoryIndex />}
      />
      <Route path={ROUTES.Department.INDEX} element={<DepartmentIndex />} />
      <Route path={ROUTES.Student.INDEX} element={<StudentIndex />} />
      <Route path={ROUTES.Student.CREATE} element={<StudentCreate />} />
      <Route path={ROUTES.Student.UPDATE()} element={<StudentUpdate />} />
      <Route path={ROUTES.Student.VIEW()} element={<StudentView />} />
      <Route path={ROUTES.Student.CHANGE} element={<StudentChange />} />
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
