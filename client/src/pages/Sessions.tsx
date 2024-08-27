import { FC, useEffect, useState, useCallback } from "react";
import SessionsTable from "components/SessionsTable";
import { formatTime } from "helpers/formatTime";
import { Session } from "types/types";
import { useLoaderData, useSubmit } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { setScramble, selectScramble } from "store/scramble/scramble.slice";
import generateScramble from "services/scramble.service";
import { instance } from "api/axios.api";

export const SessionsLoader = async () => {
  const { data } = await instance.get<Session[]>("/sessions");
  return data;
};

export const SessionsAction = async ({ request }: any) => {
  switch (request.method) {
    case "POST": {
      const formData = await request.formData();
      const newSession = {
        time: +formData.get("time"),
        scramble: formData.get("scramble"),
        extraTwo: formData.get("extraTwo") === true,
        DNF: formData.get("DNF") === true,
      };
      await instance.post("/sessions", newSession);
      return null;
    }
    case "GET": {
      const formData = await request.formData();
      const sessionId = formData.get("id");
      const { data } = await instance.get(`/sessions/session/${sessionId}`);
      return data;
    }
    case "DELETE": {
      const formData = await request.formData();
      const sessionId = formData.get("id");
      await instance.delete(`/sessions/${sessionId}`);
      return null;
    }
  }
};

const Main: FC = (): JSX.Element => {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [running, setRunning] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [spacePressed, setSpacePressed] = useState<boolean>(false);
  const [sessions, setSessions] = useState<Session[]>(
    useLoaderData() as Session[]
  );
  const dispatch = useAppDispatch();
  const submit = useSubmit();
  const scramble = useAppSelector(selectScramble);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === "Space") {
        if (!spacePressed) {
          setSpacePressed(true);
          if (!running) {
            setStartTime(Date.now());
            setRunning(true);
            setSubmitted(false);
          } else {
            setRunning(false);
          }
        }
      }
    },
    [spacePressed, running]
  );

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    if (event.code === "Space") {
      setSpacePressed(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyPress, handleKeyUp]);

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
    async (elapsed: number) => {
      await submit(
        {
          time: elapsed.toString(),
          scramble: scramble,
          extraTwo: true,
          DNF: true,
        },
        { method: "POST", action: "/sessions" }
      );
      dispatch(setScramble(generateScramble()));
      refreshSessions();
    },
    [submit, scramble, dispatch]
  );

  const refreshSessions = async () => {
    const { data } = await instance.get<Session[]>("/sessions");
    setSessions(data);
  };

  const handleReset = (): void => {
    setStartTime(null);
    setRunning(false);
    setTimeElapsed(0);
    setSubmitted(false);
  };

  const calculateAverage = (sessions: Session[], count: number): number => {
    const recentSessions = sessions.slice(0, count);

    if (recentSessions.length < count) {
      return 0;
    }

    const times = recentSessions.map((session) =>
      parseFloat(session.time.toString())
    );
    const sum = times.reduce((acc, curr) => acc + curr, 0);
    return sum / times.length;
  };

  const ao5 = calculateAverage(sessions, 5);
  const ao12 = calculateAverage(sessions, 12);

  return (
    <div className="flex">
      <SessionsTable />
      <main className="flex justify-center items-center text-center mx-auto">
        <div className="text-center flex gap-6 flex-col">
          <div className="text-8xl">{formatTime(timeElapsed)}</div>
          <div className="text-3xl">
            <p>
              ao5: <span>{ao5 > 0 ? formatTime(ao5) : "--"}</span>
            </p>
            <p>
              ao12: <span>{ao12 > 0 ? formatTime(ao12) : "--"}</span>
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
