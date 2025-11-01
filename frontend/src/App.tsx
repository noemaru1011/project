// App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ROUTES } from "@/domain/routes";
import { NotFound } from "@/pages/ErrorPage/NotFound";
import { ServerError } from "@/pages/ErrorPage/ServerError";
import { Forbidden } from "./pages/ErrorPage/Forbidden";
import Layout from "@/components/layouts/Layout";
import LoginIndex from "@/pages/LoginPage";
import HomePage from "@/pages/Home/HomePage";
import CategoryIndex from "@/pages/CategoryPage";
import SubCategoryIndex from "@/pages/SubCategoryPage";
import MinorCategoryIndex from "@/pages/MInorCategoryPage";
import DepartmentIndex from "@/pages/DepartmentPage";
import StatusIndex from "@/pages/StatusPage";
import StudnetIndex from "@/pages/StudentPage/Index";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path={ROUTES.Login.INDEX} element={<LoginIndex />} />
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.Category.INDEX} element={<CategoryIndex />} />
          <Route
            path={ROUTES.SubCategory.INDEX}
            element={<SubCategoryIndex />}
          />
          <Route
            path={ROUTES.MinorCategory.INDEX}
            element={<MinorCategoryIndex />}
          />
          <Route path={ROUTES.Department.INDEX} element={<DepartmentIndex />} />
          <Route path={ROUTES.Student.INDEX} element={<StudnetIndex />} />

          {/* エラー画面 */}
          <Route path={ROUTES.Status.INDEX} element={<StatusIndex />} />
          <Route path={ROUTES.Error.SERVER} element={<ServerError />} />
          <Route path={ROUTES.Error.Forbidden} element={<Forbidden />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
