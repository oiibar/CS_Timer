import { FC } from "react";
import { Session } from "types/types";
import SessionRow from "./SessionRow";

interface Props {
    sessions: Session[];
    onRowClick: (session: Session) => void;
    onDelete: (id: string) => void;
}

const SessionsList: FC<Props> = ({ sessions, onRowClick }) => {
    return (
        <div className="overflow-y-auto max-h-[600px] w-full">
            <table className="table text-center border-2 border-slate-800 w-full">
                <thead>
                <tr>
                    <th className="font-bold p-1">№</th>
                    <th className="font-bold p-2">Time</th>
                    <th className="font-bold p-1 max-md:hidden">Date</th>
                    <th className="font-bold p-1">Del</th>
                </tr>
                </thead>
                <tbody>
                {sessions.map((session, id) => (
                    <SessionRow
                        key={session.id}
                        session={session}
                        index={id}
                        onClick={() => onRowClick(session)}
                    />
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default SessionsList;
