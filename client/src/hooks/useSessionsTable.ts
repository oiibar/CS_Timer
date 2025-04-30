import { useState, useCallback } from "react";
import { Session } from "@interfaces/sessions";
// import { toast } from "react-toastify";
import { useAsync } from "@hooks/useAsync";

interface UseSessionsTableProps {
    onDelete: (id: number | string) => Promise<void>;
    onUpdate: (session: Session) => Promise<void>;
}

export const useSessionsTable = ({ onDelete, onUpdate }: UseSessionsTableProps) => {
    const [selectedSession, setSelectedSession] = useState<Session | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const safeDelete = useAsync(onDelete);
    const safeUpdate = useAsync(onUpdate);

    const handleSessionClick = useCallback((session: Session) => {
        setSelectedSession(session);
        setIsModalOpen(true);
    }, []);

    const handleModalClose = useCallback(() => {
        setIsModalOpen(false);
        setSelectedSession(null);
    }, []);

    const handleSave = useCallback(async (updatedSession: Session) => {
        await safeUpdate(updatedSession);
        // toast.success("Session updated");
        handleModalClose();
    }, [safeUpdate, handleModalClose]);

    const handleDelete = useCallback(async (id: number | string) => {
        await safeDelete(id);
        // toast.success("Session deleted");
    }, [safeDelete]);

    return {
        selectedSession,
        isModalOpen,
        handleSessionClick,
        handleModalClose,
        handleSave,
        handleDelete,
    };
};
