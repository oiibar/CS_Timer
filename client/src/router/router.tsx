import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "pages/ErrorPage";
import Layout from "pages/Layout";
import Home from "pages/Home";
import Login from "../pages/Auth/Login.tsx";
import Signup from "../pages/Auth/Signup.tsx";
import Sessions from "pages/Sessions";
import Profile from "pages/Profile";
import ProtectedRoute from "components/ProtectedRoute";
import { loader as sessionsLoader, action as sessionsAction } from "router/sessions";
import AuthPage from "../pages/Auth/AuthPage.tsx";

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
        loader: sessionsLoader,
        action: sessionsAction,
        element: (
            <ProtectedRoute>
              <Sessions />
            </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "auth",
        element: <AuthPage />,
      },
    ],
  },
]);

export default router;
