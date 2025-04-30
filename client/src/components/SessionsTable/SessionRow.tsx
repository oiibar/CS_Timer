import { FC } from "react";
import { FaTrash } from "react-icons/fa";
import { formatTime } from "@helpers/formatTime";
import { formatDate } from "@helpers/date.helper";
import { Session } from "@interfaces/sessions";

interface Props {
    session: Session;
    index: number;
    onClick: () => void;
    onDelete: (id: number | string) => void;
}


const SessionRow: FC<Props> = ({ session, index, onClick, onDelete }) => {
    return (
        <tr onClick={onClick} className="cursor-pointer">
            <td className="p-1 border border-slate-800">{index + 1}</td>
            <td className="p-2 border border-slate-800">{session.DNF ? "DNF" : formatTime(session.time)}</td>
            <td className="p-1 border border-slate-800 max-md:hidden">
                {formatDate(session.created_at)}
            </td>
            <td className="p-1 border border-slate-800">
                <button
                    className="btn hover:btn-red ml-auto"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(session.id);
                    }}
                >
                    <FaTrash />
                </button>
            </td>
        </tr>
    );
};


export default SessionRow;
