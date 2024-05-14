import { FC } from "react";

const Home: FC = () => {
  return (
    <main className="flex justify-center items-center">
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
  );
};

export default Home;
