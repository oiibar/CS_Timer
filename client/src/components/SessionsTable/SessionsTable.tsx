import { FC, useState } from "react";
import { instance } from "../../api/axios.api.ts";
import { Session } from "../../types/types.ts";
import SessionModal from "./SessionModal";
import BestTimeRow from "./BestTimeRow";
import SessionsList from "./SessionsList";
import { toast } from "react-toastify";

interface Props {
  sessions: Session[];
  setSessions: React.Dispatch<React.SetStateAction<Session[]>>;
}

const SessionsTable: FC<Props> = ({ sessions, setSessions }) => {
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      const response = await instance.patch(`/sessions/${updatedSession.id}`, updatedSession);
      const updatedData = response.data;

      setSessions((prev) =>
          prev.map((s) => (s.id === updatedSession.id ? { ...s, ...updatedData } : s))
      );

      toast.success("Session updated");
      handleModalClose();
    } catch (error) {
      console.error("Error updating session:", error);
      toast.error("Failed to update session");
    }
  };

  const handleDelete = async (sessionId: string) => {
    try {
      await instance.delete(`/sessions/${sessionId}`);
      setSessions((prev) => prev.filter((s) => s.id !== Number(sessionId)));

      toast.success("Session deleted");
    } catch (error) {
      console.error("Error deleting session:", error);
      toast.error("Failed to delete session");
    }
  };

  return (
      <>
        <SessionModal
            session={selectedSession}
            isOpen={isModalOpen}
            onClose={handleModalClose}
            onSave={handleSave}
        />
        <aside className="bg-slate-700 min-h-screen p-2 flex flex-col gap-2 mr-4 items-center">
          {sessions.length > 0 ? (
              <>
                <BestTimeRow sessions={sessions} />
                <SessionsList
                    sessions={sessions}
                    onRowClick={handleSessionClick}
                    onDelete={handleDelete}
                />
              </>
          ) : (
              <div>No sessions</div>
          )}
        </aside>
      </>
  );
};

export default SessionsTable;
