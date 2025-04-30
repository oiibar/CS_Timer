import { FC } from "react";
import { Session } from "@interfaces/sessions";
import { formatTime } from "@helpers/formatTime.ts";
import calculateAverage from "@services/calculateAvg.service.ts";

interface Props {
    sessions: Session[];
}

const SessionStats: FC<Props> = ({ sessions }) => {
    const ao5 = calculateAverage(sessions, 5);
    const ao12 = calculateAverage(sessions, 12);

    return (
        <div className="text-3xl">
            <p>ao5: <span>{ao5 > 0 ? formatTime(ao5) : "--"}</span></p>
            <p>ao12: <span>{ao12 > 0 ? formatTime(ao12) : "--"}</span></p>
        </div>
    );
};

export default SessionStats;
