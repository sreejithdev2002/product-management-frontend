import { BrowserRouter as Router, Routes, Route } from "react-router";
import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import SingleProductPage from "./pages/SingleProductPage";
// import Product from "./pages/Product";
// import Auth from "./pages/Auth";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              showBreadcrumbs={true}
              paths={[{ label: "Home", href: "/" }]}
            />
          }
        >
          <Route index element={<HomePage />} />
        </Route>

        <Route
          path="/product/:id"
          element={
            <Layout
              showBreadcrumbs={true}
              paths={[
                { label: "Home", href: "/" },
              ]}
            />
          }
        >
          <Route index element={<SingleProductPage />} />
        </Route>

        <Route
          path="/auth"
          element={<Layout showBreadcrumbs={false} />}
        >
          <Route index element={<AuthPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
