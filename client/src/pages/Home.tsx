import { FC, useEffect, useState } from "react";
import Sessions from "../components/Sessions";
import { Form } from "react-router-dom";

const Home: FC = (): JSX.Element => {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [stopTime, setStopTime] = useState<number | null>(null);
  const [running, setRunning] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent): void => {
      if (event.code === "Space") {
        if (!running) {
          setStartTime(Date.now());
          setRunning(true);
        } else {
          setStopTime(Date.now());
          setRunning(false);
        }
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [running]);

  useEffect(() => {
    let timer: number | undefined;
    if (running) {
      timer = setInterval(() => {
        setTimeElapsed(
          (prevTimeElapsed) => Date.now() - (startTime || 0) + prevTimeElapsed
        );
      }, 10);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [running, startTime]);

  const handleReset = (): void => {
    setStartTime(null);
    setStopTime(null);
    setRunning(false);
    setTimeElapsed(0);
  };

  const formatTime = (milliseconds: number): string => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const centiseconds = Math.floor((milliseconds % 1000) / 10);
    return `${minutes}:${String(seconds).padStart(2, "0")}.${String(
      centiseconds
    ).padStart(2, "0")}`;
  };

  return (
    <div className="flex">
      <Sessions />
      <main className="flex justify-center items-center text-center mx-auto">
        <div className="text-center flex gap-6 flex-col">
          <div className="text-9xl">{formatTime(timeElapsed)}</div>
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
