import { FC } from "react";
import SessionsTable from "@components/SessionsTable/SessionsTable";
import MainTimer from "@components/Timer/MainTimer";
import { useSessions } from "@hooks/sessions/useSessions.ts";

const Sessions: FC = () => {
    const { sessions, addSession, deleteSession, updateSession, fetchSessions } = useSessions();

    return (
        <div className="flex">
            <SessionsTable
                sessions={sessions}
                onDelete={deleteSession}
                onUpdate={updateSession}
                onDisciplineChange={fetchSessions}
            />
            <main className="flex justify-center items-center mx-auto">
                <MainTimer sessions={sessions} onAdd={addSession} />
            </main>
        </div>
    );
};

export default Sessions;
