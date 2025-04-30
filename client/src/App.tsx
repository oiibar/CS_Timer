import { RouterProvider } from "react-router-dom";
import { router } from "@router/router";
import { useAuthInit } from "@hooks/auth/useAuthInit.ts";

const App = () => {
  const { loading } = useAuthInit();

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
