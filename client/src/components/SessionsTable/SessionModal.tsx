import { FC } from "react";
import Modal from "../Modal";
import { Session } from "types/types";

interface Props {
    session: Session | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (session: Session) => void;
}

const SessionModal: FC<Props> = ({ session, isOpen, onClose, onSave }) => {
    return (
        <Modal
            session={session}
            isOpen={isOpen}
            onClose={onClose}
            onSave={onSave}
        />
    );
};

export default SessionModal;
