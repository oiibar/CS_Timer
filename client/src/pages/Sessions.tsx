import { FC, useEffect, useState } from "react";
import SessionsTable from "../components/SessionsTable";
import { formatTime } from "../helpers/formatTime";
import { Session } from "../types/types";
import { useLoaderData } from "react-router-dom";

const Main: FC = (): JSX.Element => {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [running, setRunning] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);

  const sessions = useLoaderData() as Session[];

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent): void => {
      if (event.code === "Space") {
        if (!running) {
          setStartTime(Date.now());
          setRunning(true);
        } else {
          setRunning(false);
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

  return (
    <div className="flex">
      <SessionsTable />
      <main className="flex justify-center items-center text-center mx-auto">
        <div className="text-center flex gap-6 flex-col">
          <div className="text-9xl">{formatTime(timeElapsed)}</div>
          <div className="text-3xl">
            <p>
              ao5:{" "}
              <span>
                {Math.round(
                  ((sessions[0].time +
                    sessions[1].time +
                    sessions[2].time +
                    sessions[3].time +
                    sessions[4].time) /
                    5) *
                    100
                ) / 100}
              </span>
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
