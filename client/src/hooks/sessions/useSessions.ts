import {useCallback, useEffect, useState} from "react";
import { Session } from "@interfaces/sessions.ts";
import { instance } from "@api/axios.api.ts";
import { useAsync } from "@hooks/useAsync.ts";

export const useSessions = () => {
    const [sessions, setSessions] = useState<Session[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const rawFetchSessions = useCallback(
        async (discipline?: string) => {
            const { data } = await instance.get<Session[]>("/sessions", {
                params: discipline ? { discipline } : {},
            });
            setSessions(data);
        },
        []
    );


    const fetchSessions = useAsync(rawFetchSessions);

    const rawAddSession = useCallback(async (newSession: Omit<Session, "id" | "created_at">) => {
        const { data } = await instance.post<Session>("/sessions", newSession);
        setSessions(prev => [...prev, data]);
    }, []);

    const addSession = useAsync(rawAddSession);

    const rawDeleteSession = useCallback(async (id: number | string) => {
        await instance.delete(`/sessions/${id}`);
        setSessions(prev => prev.filter(s => s.id !== id));
    }, []);

    const deleteSession = useAsync(rawDeleteSession);

    const rawUpdateSession = useCallback(async (updated: Session) => {
        await instance.patch(`/sessions/${updated.id}`, updated);
        setSessions(prev => prev.map(s => (s.id === updated.id ? updated : s)));
    }, []);

    const updateSession = useAsync(rawUpdateSession);

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                await fetchSessions('3x3x3');
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return {
        sessions,
        loading,
        fetchSessions,
        addSession,
        deleteSession,
        updateSession,
    };
};
