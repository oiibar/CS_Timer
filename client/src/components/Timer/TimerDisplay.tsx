import React from "react";
import { formatTime } from "../../helpers/formatTime.ts";

interface Props {
    timeElapsed: number;
}

const TimerDisplay: React.FC<Props> = ({ timeElapsed }) => (
    <div className="text-8xl">{formatTime(timeElapsed)}</div>
);

export default TimerDisplay;
