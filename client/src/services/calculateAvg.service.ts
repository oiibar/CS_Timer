import {Session} from "@interfaces/sessions.ts";

const calculateAverage = (sessions: Session[], count: number): number => {
    const recent = sessions.slice(0, count);
    if (recent.length < count) return 0;
    const total = recent.reduce((sum, s) => sum + s.time, 0);
    return total / count;
};

export default calculateAverage;