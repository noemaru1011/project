// App.tsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";
import { NavigationService } from "@/utils/NavigationService";
import { ROUTES } from "@/domain/routes";

import Layout from "@/components/layouts/Layout";
import LoginIndex from "@/pages/LoginPage";
import HomePage from "@/pages/Home/HomePage";
import CategoryIndex from "@/pages/CategoryPage";
import SubCategoryIndex from "@/pages/SubCategoryPage";
import MinorCategoryIndex from "@/pages/MInorCategoryPage";
import DepartmentIndex from "@/pages/DepartmentPage";
import StatusIndex from "@/pages/StatusPage";
import StudentCreate from "@/pages/StudentPage/create";

import { NotFound } from "@/pages/ErrorPage/NotFound";
import { ServerError } from "@/pages/ErrorPage/ServerError";
import { Forbidden } from "@/pages/ErrorPage/Forbidden";

/**
 * useNavigate() をグローバルで使えるようにする
 * NavigationService に navigate 関数をセット
 */
function NavigatorProvider() {
  const navigate = useNavigate();

  useEffect(() => {
    NavigationService.setNavigator(navigate);
  }, [navigate]);

  // Routesをここにまとめることで、NavigationServiceが確実に初期化された状態で描画される
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={ROUTES.Login.INDEX} element={<LoginIndex />} />
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.Category.INDEX} element={<CategoryIndex />} />
        <Route path={ROUTES.SubCategory.INDEX} element={<SubCategoryIndex />} />
        <Route
          path={ROUTES.MinorCategory.INDEX}
          element={<MinorCategoryIndex />}
        />
        <Route path={ROUTES.Department.INDEX} element={<DepartmentIndex />} />
        <Route path={ROUTES.Student.CREATE} element={<StudentCreate />} />

        {/* エラー画面 */}
        <Route path={ROUTES.Status.INDEX} element={<StatusIndex />} />
        <Route path={ROUTES.Error.SERVER} element={<ServerError />} />
        <Route path={ROUTES.Error.Forbidden} element={<Forbidden />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

/**
 * アプリ全体のルーティングを管理
 */
const App = () => {
  return (
    <Router>
      <NavigatorProvider />
    </Router>
  );
};

export default App;
