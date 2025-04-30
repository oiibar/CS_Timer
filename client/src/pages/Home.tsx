import { FC } from "react";
import { SiNintendogamecube } from "react-icons/si";
import { Link } from "react-router-dom";
import { useAuth } from "@hooks/auth/useAuth.ts";

const Home: FC = () => {
    const isAuth = useAuth();

  return (
    <div className="flex flex-col gap-3 mt-10 items-center justify-center text-center">
      <SiNintendogamecube size={200} />
      <p className="text-2xl max-w-lg">
        It's a professional timing program designed for Rubik's cube speedsolvers.
      </p>
        {isAuth && (
            <Link to="/sessions" className="py-2 text-white/50 hover:text-white">
                <button className="btn btn-green text-md">Timer</button>
            </Link>
        )}
    </div>
  );
};

export default Home;
