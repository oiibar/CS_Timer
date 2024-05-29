import { FC } from "react";
import { Form, useLoaderData } from "react-router-dom";
import { instance } from "../api/axios.api";
import { Session } from "../types/types";
import { formatDate } from "../helpers/date.helper";
import { FaTrash } from "react-icons/fa";
import { formatTime } from "../helpers/formatTime"; // Import the formatTime function

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

  return (
    <aside className="bg-slate-700 h-screen p-4 overflow-auto">
      {sessions.length ? (
        <table className="table-auto text-center border-2 border-slate-800">
          <thead>
            <tr>
              <td className="font-bold p-1">№</td>
              <td className="font-bold p-2">Time (s)</td>{" "}
              {/* Add (s) to indicate seconds */}
              <td className="font-bold p-1">Scramble</td>
              <td className="font-bold p-1">Date</td>
              <td className="font-bold p-1">Del</td>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session, id) => (
              <tr key={id}>
                <td className="p-1 border border-slate-800">{id + 1}</td>
                <td className="p-2 border border-slate-800">
                  {formatTime(session.time)}{" "}
                  {/* Format time to display in seconds */}
                </td>
                <td className="p-2 border border-slate-800">
                  {session.scramble}
                </td>
                <td className="p-1 border border-slate-800">
                  {formatDate(session.created_at)}
                </td>
                <td className="p-1 border border-slate-800">
                  <Form method="DELETE" action="/sessions">
                    <input type="hidden" name="id" value={session.id} />
                    <button className="btn hover:btn-red ml-auto">
                      <FaTrash />
                    </button>
                  </Form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No sessions</div>
      )}
    </aside>
  );
};

export default SessionsTable;
