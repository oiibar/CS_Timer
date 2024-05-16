import { FC, useEffect, useState } from "react";
import { instance } from "../api/axios.api";
import { ResponseSessionsLoader, Session } from "../types/types";
import { toast } from "react-toastify";
import { Form, useLoaderData } from "react-router-dom";
import { formatDate } from "../helpers/date.helper";
import { FaTrash } from "react-icons/fa";

export const SessionsLoader = async () => {
  const transactions = await instance.get<Session[]>("/sessions");
  return { transactions: transactions.data };
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

const Sessions: FC = () => {
  const sessions = useLoaderData() as ResponseSessionsLoader;

  const [data, setData] = useState<Session[]>([]);

  const fetchSessions = async () => {
    const response = await instance.get(`/sessions`);
    setData(response.data);
  };

  useEffect(() => {
    fetchSessions();
  }, [sessions]);

  return (
    <aside className="bg-slate-700 h-screen max-w-64 p-4">
      <table className="table-auto text-center border-2 border-slate-800">
        <thead>
          <tr>
            <td className="font-bold">№</td>
            <td className="font-bold">Time</td>
            <td className="font-bold">Date</td>
            <td className="font-bold">Del</td>
          </tr>
        </thead>
        <tbody>
          {data.map((sessions, id) => (
            <tr key={id}>
              <td className="p-2">{id + 1}</td>
              <td className="p-2">{sessions.time}</td>
              <td className="p-2">{formatDate(sessions.created_at)}</td>
              <td className="p-2">
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
    </aside>
  );
};

export default Sessions;
