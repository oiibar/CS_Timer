import { FC, useEffect, useState } from "react";
import SessionsTable from "../components/SessionsTable";
import { formatTime } from "../helpers/formatTime";
import { Session } from "../types/types";
import { useLoaderData, useSubmit } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setScramble } from "../store/scramble/scramble.slice";
import generateScramble from "../services/scramble.service";
import { selectScramble } from "../store/scramble/scramble.slice";

const Main: FC = (): JSX.Element => {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [running, setRunning] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const sessions = useLoaderData() as Session[];
  const dispatch = useAppDispatch();
  const submit = useSubmit();
  const scramble = useAppSelector(selectScramble);
  const [sessionSaved, setSessionSaved] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent): void => {
      if (event.code === "Space") {
        if (!running) {
          setStartTime(Date.now());
          setRunning(true);
          setSessionSaved(false);
        } else {
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
      timer = window.setInterval(() => {
        setTimeElapsed(Date.now() - (startTime || 0));
      }, 10);
    } else if (startTime !== null && !sessionSaved) {
      setTimeElapsed(Date.now() - startTime);
      dispatch(setScramble(generateScramble()));
      submit(
        {
          time: formatTime(timeElapsed).toString(),
          scramble: scramble,
          extraTwo: "false",
          DNF: "false",
        },
        { method: "POST", action: "/sessions" }
      );

      setSessionSaved(true);
    }
    return () => {
      if (timer) window.clearInterval(timer);
    };
  }, [
    running,
    startTime,
    timeElapsed,
    dispatch,
    scramble,
    submit,
    sessionSaved,
  ]);

  const handleReset = (): void => {
    setStartTime(null);
    setRunning(false);
    setTimeElapsed(0);
    setSessionSaved(false);
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
