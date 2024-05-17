import { FC, useEffect, useState } from "react";
import SessionsTable from "../components/SessionsTable";

const Main: FC = (): JSX.Element => {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [running, setRunning] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [savedTimes, setSavedTimes] = useState<number[]>([]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent): void => {
      if (event.code === "Space") {
        if (!running) {
          setStartTime(Date.now());
          setRunning(true);
        } else {
          setRunning(false);
          if (startTime !== null) {
            const elapsed = Date.now() - startTime;
            setSavedTimes((prevSavedTimes) => [...prevSavedTimes, elapsed]);
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [running, startTime]);

  useEffect(() => {
    let timer: number | undefined;

    if (running) {
      timer = window.setInterval(() => {
        setTimeElapsed(Date.now() - (startTime || 0));
      }, 10);
    } else if (startTime !== null) {
      setTimeElapsed(Date.now() - startTime);
    }

    return () => {
      if (timer) window.clearInterval(timer);
    };
  }, [running, startTime]);

  const handleReset = (): void => {
    setStartTime(null);
    setRunning(false);
    setTimeElapsed(0);
  };

  const formatTime = (milliseconds: number): string => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const centiseconds = Math.floor((milliseconds % 1000) / 10);

    return minutes > 0
      ? `${minutes}:${String(seconds).padStart(2, "0")}.${String(
          centiseconds
        ).padStart(2, "0")}`
      : `${seconds}.${String(centiseconds).padStart(2, "0")}`;
  };

  return (
    <div className="flex">
      <SessionsTable />
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
          <button
            className="btn btn-red flex text-center items-center justify-center w-fit mx-auto"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </main>
    </div>
  );
};

export default Main;
