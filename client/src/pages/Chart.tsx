import { FC, useCallback, useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { useAsync } from "@hooks/useAsync.ts";
import { instance } from "@api/axios.api.ts";
import { Session } from "@interfaces/sessions.ts";
import {formatDate} from "@helpers/date.helper.ts";
import {formatTime} from "@helpers/formatTime.ts";

const Chart: FC = () => {
    const [sessions, setSessions] = useState<Session[]>([]);
    // @ts-ignore
    const [loading, setLoading] = useState<boolean>(false);

    const rawFetchSessions = useCallback(async () => {
        const { data } = await instance.get<Session[]>("/sessions");
        setSessions(data);
    }, []);

    const fetchSessions = useAsync(rawFetchSessions);

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                await fetchSessions();
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const chartData = sessions.map((s) => ({
        id: s.id,
        label: formatDate(s.created_at),
        time: formatTime(s.time),
        extraTwo: s.extraTwo,
        DNF: s.DNF,
        scramble: s.scramble
    }));

    return (
        <div className="w-full h-[600px]">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="label" angle={-30} textAnchor="end" height={60} />
                    <YAxis label={{ value: "Time (s)", angle: -90, position: "insideLeft" }} />
                    <Tooltip content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                                <div className="bg-white text-black p-2 rounded shadow text-sm">
                                    <p><strong>Solve at:</strong> {label}</p>
                                    <p><strong>Time:</strong> {data.time}</p>
                                    <p><strong>Scramble:</strong> {data.scramble}</p>
                                    {data.DNF && <p className="text-red-500 font-semibold">DNF</p>}
                                    {data.extraTwo && <p className="text-blue-500 font-semibold">+2 Penalty</p>}
                                </div>
                            );
                        }
                        return null;
                    }} />

                    <Line
                        type="monotone"
                        dataKey="time"
                        stroke="#4ade80"
                        strokeWidth={2}
                        activeDot={{ r: 6 }}
                        name="Solve Time"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Chart;
