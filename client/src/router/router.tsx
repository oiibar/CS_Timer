import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "pages/ErrorPage";
import Layout from "pages/Layout";
import Home from "pages/Home";
import Login from "pages/auth/Login";
import Sessions from "pages/Sessions";
import Signup from "pages/auth/Signup";
import ProtectedRoute from "components/ProtectedRoute";
import { SessionsAction, SessionsLoader } from "pages/Sessions";
import AllSessions from "pages/AllSessions";
import Profile from "pages/Profile";

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
        path: "allsessions",
        element: <AllSessions />,
      },
    ],
  },
]);

export default router;
