import React from "react";
import { formatTime } from "@helpers/formatTime.ts";

interface Props {
    ao5: number;
    ao12: number;
}

const AverageDisplay: React.FC<Props> = ({ ao5, ao12 }) => (
    <div className="text-3xl">
        <p>ao5: <span>{ao5 > 0 ? formatTime(ao5) : "--"}</span></p>
        <p>ao12: <span>{ao12 > 0 ? formatTime(ao12) : "--"}</span></p>
    </div>
);

export default AverageDisplay;
