import { FC, useEffect, useState } from "react";
import { instance } from "../api/axios.api";
import { ResponseSessionsLoader, Session } from "../types/types";
import { toast } from "react-toastify";
import { Form, useLoaderData } from "react-router-dom";
import { formatDate } from "../helpers/date.helper";
import { FaTrash } from "react-icons/fa";
import Modal from "./Modal";

export const SessionsLoader = async () => {
  const sessions = await instance.get<Session[]>("/sessions");
  return { sessions: sessions.data };
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
  const sessions = useLoaderData() as ResponseSessionsLoader;

  const [data, setData] = useState<Session[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [sessionId, setSessionId] = useState<number>(0);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const fetchSessions = async () => {
    const response = await instance.get(`/sessions`);
    setData(response.data);
  };

  useEffect(() => {
    fetchSessions();
  }, [sessions]);

  return (
    <aside className="bg-slate-700 h-screen max-w-64 p-4 overflow-auto">
      {data.length ? (
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
            {data.map((sessions, id) => (
              <tr key={id}>
                <td
                  className="p-1 border border-slate-800"
                  onClick={() => setSessionId(id)}
                >
                  {id + 1}
                </td>
                <td className="p-2 border border-slate-800">{sessions.time}</td>
                <td className="p-1 border border-slate-800">
                  {formatDate(sessions.created_at)}
                </td>
                <td className="p-1 border border-slate-800">
                  <Form method="DELETE" action="/sessions">
                    <input type="hidden" name="id" value={sessions.id} />
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

      {visible && (
        <Modal
          type="patch"
          id={sessionId}
          sessions={data}
          setVisibleModal={setVisible}
        ></Modal>
      )}
    </aside>
  );
};

export default SessionsTable;
