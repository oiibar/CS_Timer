import { FC, useEffect, useState, useCallback } from "react";
import SessionsTable from "../components/SessionsTable";
import { formatTime } from "../helpers/formatTime";
import { Session } from "../types/types";
import { useLoaderData, useSubmit } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setScramble, selectScramble } from "../store/scramble/scramble.slice";
import generateScramble from "../services/scramble.service";

const Main: FC = (): JSX.Element => {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [running, setRunning] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [submitted, setSubmitted] = useState<boolean>(false); // New state
  const sessions = useLoaderData() as Session[];
  const dispatch = useAppDispatch();
  const submit = useSubmit();
  const scramble = useAppSelector(selectScramble);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === "Space") {
        if (!running) {
          setStartTime(Date.now());
          setRunning(true);
          setSubmitted(false); // Reset the submission state
        } else {
          setRunning(false);
        }
      }
    },
    [running]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  useEffect(() => {
    let timer: number | undefined;
    if (running) {
      timer = window.setInterval(() => {
        setTimeElapsed(Date.now() - (startTime || 0));
      }, 10);
    } else {
      if (startTime !== null && !submitted) {
        const elapsed = Date.now() - startTime;
        setTimeElapsed(elapsed);
        setSubmitted(true);
        submitSession(elapsed);
      }
    }
    return () => {
      if (timer) window.clearInterval(timer);
    };
  }, [running, startTime, submitted]);

  const submitSession = useCallback(
    (elapsed: number) => {
      submit(
        {
          time: formatTime(elapsed).toString(),
          scramble: scramble,
          extraTwo: "false",
          DNF: "false",
        },
        { method: "POST", action: "/sessions" }
      );
      dispatch(setScramble(generateScramble()));
    },
    [submit, scramble, dispatch]
  );

  const handleReset = (): void => {
    setStartTime(null);
    setRunning(false);
    setTimeElapsed(0);
    setSubmitted(false);
  };

  return (
    <div className="flex">
      <SessionsTable />
      <main className="flex justify-center items-center text-center mx-auto">
        <div className="text-center flex gap-6 flex-col">
          <div className="text-9xl">{formatTime(timeElapsed)}</div>
          <div className="text-3xl">
            <p>
              ao5: <span>{5}</span>
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
