import { FC } from "react";
import { Session } from "@interfaces/sessions.ts";
import { formatTime } from "@helpers/formatTime";

interface Props {
    sessions: Session[];
}

const BestTimeRow: FC<Props> = ({ sessions }) => {
    if (!sessions.length) return null;

    const fastest = sessions.reduce((prev, current) =>
        prev.time < current.time ? prev : current
    );

    return (
        <table className="table-auto text-center mx-auto w-full border-2 border-slate-800 mb-4">
            <tbody>
            <tr>
                <td className="p-4 border border-slate-800">
                    <strong>Best Time:</strong> {formatTime(fastest.time)}
                </td>
            </tr>
            </tbody>
        </table>
    );
};

export default BestTimeRow;
