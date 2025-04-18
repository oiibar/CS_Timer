import React, { useState } from "react";
import SessionsTable from "../components/SessionsTable/SessionsTable.tsx";
import MainTimer from "../components/Timer/MainTimer.tsx";
import { useLoaderData } from "react-router-dom";
import { Session } from "types/types";

const MainPage: React.FC = () => {
  const loadedSessions = useLoaderData() as Session[];
  const [sessions, setSessions] = useState<Session[]>(loadedSessions);

  return (
      <div className="flex">
          <SessionsTable sessions={sessions} setSessions={setSessions} />
          <main className="flex justify-center items-center mx-auto">
            <MainTimer sessions={sessions} setSessions={setSessions} />
          </main>
      </div>
  );
};

export default MainPage;
