import { FC } from "react";
import { Session } from "@interfaces/sessions.ts";
import SessionModal from "./SessionModal";
import BestTimeRow from "./BestTimeRow";
import SessionsList from "./SessionsList";
import { useSessionsTable } from "@hooks/useSessionsTable";
import { exportSessionsToCSV } from "@helpers/exportCSV";
import {Link} from "react-router-dom";

interface Props {
  sessions: Session[];
  onDelete: (id: number | string) => Promise<void>;
  onUpdate: (session: Session) => Promise<void>;
}

const SessionsTable: FC<Props> = ({ sessions, onDelete, onUpdate }) => {
  const {
    selectedSession,
    isModalOpen,
    handleSessionClick,
    handleModalClose,
    handleSave,
    handleDelete,
  } = useSessionsTable({ onDelete, onUpdate });

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
                  <button
                      onClick={() => exportSessionsToCSV(sessions)}
                      className="mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  >
                      Export as CSV
                  </button>
                <BestTimeRow sessions={sessions} />
                <SessionsList
                    sessions={sessions}
                    onRowClick={handleSessionClick}
                    onDelete={handleDelete}
                />
                  <div className="mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                      <Link to="/chart">
                          See Progress
                      </Link>
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
