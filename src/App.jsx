import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import { Suspense, useState } from "react";
import ProductPage from "./pages/ProductPage";
import CategoryPage from "./pages/CategoryPage";
import LoginPage from "./pages/LoginPage";
import { TOKEN } from "./constants/loginDetails";
import Loading from "./pages/Loading";

function App() {
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem(TOKEN) ? true : false
  );

  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route
              path="/"
              element={isLogin ? <CategoryPage /> : <Navigate to="/login" />}
            />
            <Route
              path="category/:categoryId/product"
              element={<ProductPage />}
            />
            {/* <Route path="/:categoryId/:productId/cart" element={<CartPage />} /> */}
          </Route>
          <Route path="login" element={<LoginPage setIsLogin={setIsLogin} />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
