import { useEffect, useState, useCallback } from "react";
import { Session } from "@interfaces/sessions";
import { toast } from "react-toastify";

interface UseSessionModalProps {
    session: Session | null;
    onClose: () => void;
    onSave: (updatedSession: Session) => void;
}

export const useSessionModal = ({ session, onClose, onSave }: UseSessionModalProps) => {
    const [extraTwo, setExtraTwo] = useState(false);
    const [dnf, setDnf] = useState(false);

    useEffect(() => {
        if (session) {
            setExtraTwo(session.extraTwo);
            setDnf(session.DNF);
        }
    }, [session]);

    const baseTime = session ? (session.extraTwo ? session.time - 2000 : session.time) : 0;

    const adjustedTime = baseTime + (extraTwo ? 2000 : 0);

    const handleToggleExtraTwo = useCallback(() => {
        if (dnf) setDnf(false);
        setExtraTwo(prev => !prev);
    }, [dnf]);

    const handleToggleDnf = useCallback(() => {
        if (extraTwo) setExtraTwo(false);
        setDnf(prev => !prev);
    }, [extraTwo]);

    const handleSave = useCallback(() => {
        if (!session) return;

        onSave({
            ...session,
            time: adjustedTime,
            extraTwo,
            DNF: dnf,
        });
        toast.success("Saved successfully");
        onClose();
    }, [session, adjustedTime, extraTwo, dnf, onSave, onClose]);

    return {
        extraTwo,
        adjustedTime,
        handleToggleExtraTwo,
        handleSave,
        dnf,
        handleToggleDnf
    };
};
