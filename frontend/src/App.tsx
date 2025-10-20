// App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ROUTES } from "@/domain/routes";
import HomePage from "@/pages/Home/HomePage";
import CustomerCreatePage from "@/pages/CustomerPage/CreatePage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.CUSTOMER.CREATE} element={<CustomerCreatePage />} />
      </Routes>
    </Router>
  );
};

export default App;
