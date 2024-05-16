import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import Layout from "../pages/Layout";
import Home from "../pages/Home";
import Auth from "../pages/Auth";
import ProtectedRoute from "../components/ProtectedRoute";
import Sessions, {
  SessionsAction,
  SessionsLoader,
} from "../components/Sessions";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "sessions",
        loader: SessionsLoader,
        action: SessionsAction,
        element: (
          <ProtectedRoute>
            <Sessions />
          </ProtectedRoute>
        ),
      },
      {
        path: "auth",
        element: <Auth />,
      },
    ],
  },
]);
