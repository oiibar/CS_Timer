import {FC, useState} from "react";
import { Session } from "@interfaces/sessions.ts";
import SessionModal from "./SessionModal";
import BestTimeRow from "./BestTimeRow";
import SessionsList from "./SessionsList";
import { useSessionsTable } from "@hooks/sessions/useSessionsTable.ts";
import { exportSessionsToCSV } from "@helpers/exportCSV";
import {Link} from "react-router-dom";

interface Props {
  sessions: Session[];
  onDelete: (id: number | string) => Promise<void>;
  onUpdate: (session: Session) => Promise<void>;
  onDisciplineChange: (discipline: string) => Promise<void>;
}

const SessionsTable: FC<Props> = ({ sessions, onDelete, onUpdate, onDisciplineChange }) => {
    const {
        selectedSession,
        isModalOpen,
        handleSessionClick,
        handleModalClose,
        handleSave,
        handleDelete,
    } = useSessionsTable({ onDelete, onUpdate });

    const [discipline, setDiscipline] = useState<string>("3x3x3");

    const filteredSessions = sessions;

    return (
        <>
            <SessionModal
                session={selectedSession}
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onSave={handleSave}
            />
            <aside className="bg-slate-700 min-h-screen p-2 flex flex-col gap-2 mr-4 items-center">
                <div className="flex gap-2 mb-2">
                    {["2x2x2", "3x3x3", "4x4x4"].map(d => (
                        <button
                            key={d}
                            onClick={async () => {
                                setDiscipline(d);
                                await onDisciplineChange(d);
                            }}
                            className={`px-3 py-1 rounded ${
                                d === discipline ? "bg-blue-600 text-white" : "bg-gray-300 text-black"
                            }`}
                        >
                            {d}
                        </button>
                    ))}
                </div>

                {filteredSessions.length > 0 ? (
                    <>
                        <button
                            onClick={() => exportSessionsToCSV(filteredSessions)}
                            className="mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                        >
                            Export as CSV
                        </button>
                        <BestTimeRow sessions={filteredSessions} />
                        <SessionsList
                            sessions={filteredSessions}
                            onRowClick={handleSessionClick}
                            onDelete={handleDelete}
                        />
                        <div className="mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                            <Link to="/chart">See Progress</Link>
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
