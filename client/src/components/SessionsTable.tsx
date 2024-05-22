import { FC } from "react";
import { Form, useLoaderData } from "react-router-dom";
import { instance } from "../api/axios.api";
import { Session } from "../types/types";
import { toast } from "react-toastify";
import { formatDate } from "../helpers/date.helper";
import { FaTrash } from "react-icons/fa";
import { useAppSelector } from "../store/hooks";
import { selectScramble } from "../store/scramble/scramble.slice";

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
        extraTwo: formData.get("extraTwo"),
        DNF: formData.get("DNF"),
      };
      await instance.post("/sessions", newSession);
      toast.success("Session added successfully");
      return null;
    }
    case "DELETE": {
      const formData = await request.formData();
      const sessionId = formData.get("id");
      await instance.delete(`/sessions/session/${sessionId}`);
      toast.success("Deleted successfully");
      return null;
    }
  }
};

const SessionsTable: FC = () => {
  const sessions = useLoaderData() as Session[];
  const scramble = useAppSelector(selectScramble);

  return (
    <aside className="bg-slate-700 h-screen max-w-64 p-4 overflow-auto">
      {sessions.length ? (
        <table className="table-auto text-center border-2 border-slate-800">
          <thead>
            <tr>
              <td className="font-bold p-1 ">№</td>
              <td className="font-bold p-2 ">Time</td>
              <td className="font-bold p-1 ">Date</td>
              <td className="font-bold p-1 ">Del</td>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session, id) => (
              <tr key={id}>
                <td className="p-1 border border-slate-800">{id + 1}</td>
                <td className="p-2 border border-slate-800">{session.time}</td>
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
