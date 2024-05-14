import { FC } from "react";
import Sessions from "../components/Sessions";

const Home: FC = () => {
  return (
    <div className="flex">
      <Sessions />
      <main className="flex justify-center items-center text-center mx-auto">
        <div className="text-center flex gap-6 flex-col">
          <div className="text-9xl">4.73</div>
          <div className="text-3xl">
            <p>
              ao5: <span>4.73</span>
            </p>
            <p>
              ao12: <span>4.73</span>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
