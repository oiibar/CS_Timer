import { RouterProvider } from "react-router-dom";
import { router } from "router/router";
import { useAppDispatch } from "store/hooks";
import { getToken, removeToken } from "helpers/localstorage.helper";
import { AuthService } from "services/auth.service";
import { login, logout } from "store/user/userSlice";
import { useEffect, useState } from "react";

const App = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    const token = getToken();
    try {
      if (token) {
        const data = await AuthService.getProfile();
        if (data) {
          dispatch(login(data));
        } else {
          throw new Error("Invalid profile data");
        }
      } else {
        throw new Error("No token found");
      }
    } catch (err) {
      console.error("Authentication check failed:", err);
      removeToken("token");
      dispatch(logout());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return <RouterProvider router={router} />;
};

export default App;
