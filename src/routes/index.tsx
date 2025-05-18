import { useRoutes } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import HomePage from "../pages/HomePage";
import ProductsPage from "../pages/ProductsPage";
import Layout from "../components/layout";
import ProductsForm from "../components/template/products/ProductsForm";
import ProtectedRoute from "../components/guards/ProtectedRoute";
import NotFoundPage from "../pages/NotFoundPage";

export default function Routes() {
  return useRoutes([
    {
      path: "/",
      element: <AuthPage />,
    },
    {
      path: "system",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "home",
          element: <HomePage />,
        },
        {
          path: "products",
          element: <ProductsPage />,
        },
        {
          path: "formproducts/:codigo?",
          element: <ProductsForm />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);
}
