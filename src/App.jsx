import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import PublicLayout from "./Layouts/PublicLayouts";
import PrivateLayout from "./Layouts/PrivateLayouts";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import SingleProductPage from "./pages/SingleProductPage";

// Check if the user is authenticated
const isAuthenticated = () => {
  return !!localStorage.getItem("product-management-token");
};

// Protect private routes
const PrivateRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/auth" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route - Auth without navbar */}
        <Route path="/auth" element={<PublicLayout />}>
          <Route index element={<AuthPage />} />
        </Route>

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<PrivateLayout />}>
            <Route index element={<HomePage />} />
          </Route>

          <Route path="/product/:id" element={<PrivateLayout />}>
            <Route index element={<SingleProductPage />} />
          </Route>
        </Route>

        {/* Redirect unknown paths */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
