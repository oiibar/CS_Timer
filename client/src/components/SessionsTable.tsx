import { FC, useState, useEffect } from "react";
import { Form, useLoaderData } from "react-router-dom";
import { instance } from "api/axios.api";
import { formatDate } from "helpers/date.helper";
import { FaTrash } from "react-icons/fa";
import { formatTime } from "helpers/formatTime";
import Modal from "components/Modal";
import { Session } from "types/types";

const SessionsTable: FC = () => {
  const loadedSessions = useLoaderData() as Session[];
  const [sessions, setSessions] = useState<Session[]>(loadedSessions);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fastestSession =
    sessions.length > 0
      ? sessions.reduce((prev, current) =>
          prev.time < current.time ? prev : current
        )
      : null;

  const handleSessionClick = (session: Session) => {
    setSelectedSession(session);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedSession(null);
  };

  const handleSave = async (updatedSession: Session) => {
    try {
      const response = await instance.patch(
        `/sessions/${updatedSession.id}`,
        updatedSession
      );
      const updatedData = response.data;

      // Update the sessions state with the new session data
      setSessions((prevSessions) =>
        prevSessions.map((session) =>
          session.id === updatedSession.id
            ? { ...session, ...updatedData }
            : session
        )
      );

      setIsModalOpen(false);
      setSelectedSession(null);
    } catch (error) {
      console.error("Error updating session:", error);
    }
  };

  return (
    <>
      <Modal
        session={selectedSession}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleSave}
      />
      <aside className="bg-slate-700 min-h-screen p-2 flex flex-col gap-2 mr-4 items-center">
        {sessions.length ? (
          <>
            {fastestSession && (
              <table className="table-auto text-center mx-auto w-full border-2 border-slate-800 mb-4">
                <tbody>
                  <tr className="cursor-pointer">
                    <td className="p-4 border border-slate-800">
                      <strong>Best Time:</strong>{" "}
                      {formatTime(fastestSession.time)}
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
            <div className="overflow-y-auto max-h-[600px]">
              <table className="table text-center overflow-y-scroll border-2 border-slate-800">
                <thead>
                  <tr>
                    <td className="font-bold p-1">№</td>
                    <td className="font-bold p-2">Time</td>
                    <td className="font-bold p-1 max-md:hidden">Date</td>
                    <td className="font-bold p-1">Del</td>
                  </tr>
                </thead>
                <tbody>
                  {sessions.map((session, id) => (
                    <tr
                      key={id}
                      onClick={() => handleSessionClick(session)}
                      className="cursor-pointer"
                    >
                      <td className="p-1 border border-slate-800">{id + 1}</td>
                      <td className="p-2 border border-slate-800">
                        {formatTime(session.time)}
                      </td>
                      <td className="p-1 border border-slate-800 max-md:hidden">
                        {formatDate(session.created_at)}
                      </td>
                      <td className="p-1 border border-slate-800">
                        <Form method="DELETE" action="/sessions">
                          <input type="hidden" name="id" value={session.id} />
                          <button
                            className="btn hover:btn-red ml-auto"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <FaTrash />
                          </button>
                        </Form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div>No sessions</div>
        )}
      </aside>
    </>
  );
};

export default SessionsTable;
