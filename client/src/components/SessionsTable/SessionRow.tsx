import { FC } from "react";
import { Form } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { formatTime } from "helpers/formatTime";
import { formatDate } from "helpers/date.helper";
import { Session } from "types/types";

interface Props {
    session: Session;
    index: number;
    onClick: () => void;
}

const SessionRow: FC<Props> = ({ session, index, onClick }) => {
    return (
        <tr onClick={onClick} className="cursor-pointer">
            <td className="p-1 border border-slate-800">{index + 1}</td>
            <td className="p-2 border border-slate-800">{formatTime(session.time)}</td>
            <td className="p-1 border border-slate-800 max-md:hidden">
                {formatDate(session.created_at)}
            </td>
            <td className="p-1 border border-slate-800">
                <Form method="DELETE">
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
    );
};

export default SessionRow;
