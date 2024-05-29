import { FC, useState } from "react";
import { Form, useLoaderData } from "react-router-dom";
import { instance } from "../api/axios.api";
import { Session } from "../types/types";
import { formatDate } from "../helpers/date.helper";
import { FaTrash } from "react-icons/fa";
import { formatTime } from "../helpers/formatTime";
import Modal from "./Modal"; // Import the modal component

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
        extraTwo: formData.get("extraTwo") === "true",
        DNF: formData.get("DNF") === "true",
      };
      await instance.post("/sessions", newSession);
      return null;
    }
    case "GET": {
      const formData = await request.formData();
      const sessionId = formData.get("id");
      await instance.get(`/sessions/session/${sessionId}`);
      return null;
    }
    case "DELETE": {
      const formData = await request.formData();
      const sessionId = formData.get("id");
      await instance.delete(`/sessions/session/${sessionId}`);
      return null;
    }
  }
};

const SessionsTable: FC = () => {
  const sessions = useLoaderData() as Session[];
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Calculate the fastest session if there are sessions
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
    await instance.put(
      `/sessions/session/${updatedSession.id}`,
      updatedSession
    );
    // Optionally refetch sessions or update state to reflect changes
    setIsModalOpen(false);
    setSelectedSession(null);
  };

  return (
    <>
      <Modal
        session={selectedSession}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleSave}
      />
      <aside className="bg-slate-700 h-screen p-4 overflow-auto flex flex-col gap-2">
        {sessions.length ? (
          <>
            {fastestSession && (
              <table className="table-auto text-center mx-auto w-full border-2 border-slate-800 mb-4">
                <tbody>
                  <tr className="cursor-pointer">
                    <td className="p-6 border border-slate-800">
                      <strong>Best Time:</strong>{" "}
                      {formatTime(fastestSession.time)}
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
            <table className="table-auto text-center border-2 border-slate-800">
              <thead>
                <tr>
                  <td className="font-bold p-1">№</td>
                  <td className="font-bold p-2">Time</td>
                  <td className="font-bold p-1">Date</td>
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
                    <td className="p-1 border border-slate-800">
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
          </>
        ) : (
          <div>No sessions</div>
        )}
      </aside>
    </>
  );
};

export default SessionsTable;
