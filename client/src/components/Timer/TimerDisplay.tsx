import React from "react";
import { formatTime } from "@helpers/formatTime.ts";
import {Session} from "@interfaces/sessions.ts";

interface Props {
    timeElapsed: number;
    status: 'default' | 'holding' | 'ready' | 'running';
    sessions: Session[];
    showNewPB: boolean;
}

const TimerDisplay: React.FC<Props> = ({ timeElapsed, status, sessions, showNewPB }) => {
    let color = 'text-white';
    if (status === 'holding') color = 'text-red-500';
    else if (status === 'ready') color = 'text-green-500';

    return (
        <div className={`text-8xl ${color}`}>
            {formatTime(timeElapsed)}
            {showNewPB && status !== 'running' && sessions.length !== 1 && (
                <div className={`text-xl font-bold text-red-500`}>New Personal Best</div>
            )}
        </div>
    );
};

export default TimerDisplay;
