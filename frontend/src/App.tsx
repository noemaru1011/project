// App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ROUTES } from "@/domain/routes";
import { NotFound } from "@/pages/NotFoundPage/NotFound";
import Layout from "@/components/layouts/Layout";
import HomePage from "@/pages/Home/HomePage";
import CategoryIndex from "@/pages/CategoryPage";
import SubCategoryIndex from "@/pages/SubCategoryPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.Category.INDEX} element={<CategoryIndex />} />
          <Route
            path={ROUTES.SubCategory.INDEX}
            element={<SubCategoryIndex />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
