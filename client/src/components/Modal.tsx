import { FC, useState, useEffect } from "react";
import { Session } from "../types/types";

interface SessionModalProps {
  session: Session | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedSession: Session) => void;
}

const SessionModal: FC<SessionModalProps> = ({
  session,
  isOpen,
  onClose,
  //onSave,
}) => {
  const [dnf, setDnf] = useState(false);
  const [extraTwo, setExtraTwo] = useState(false);
  const [updatedTime, setUpdatedTime] = useState(session?.time || 0);

  useEffect(() => {
    if (session) {
      setDnf(false);
      setExtraTwo(false);
      setUpdatedTime(session.time);
    }
  }, [session]);

  //   const handleSave = () => {
  //     let newTime = session?.time || 0;
  //     if (dnf) {
  //       newTime = NaN; // Represent DNF as NaN
  //     } else if (extraTwo) {
  //       newTime += 2000; // Add 2 seconds in milliseconds
  //     }
  //     if (session) {
  //       onSave({ ...session, time: newTime, DNF: dnf, extraTwo: extraTwo });
  //     }
  //     onClose();
  //   };

  if (!isOpen || !session) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center text-center">
      <div className="bg-slate-700 p-4 rounded-md shadow-md flex flex-col gap-2">
        <h2 className="text-2xl mb-4">Session Details</h2>
        <p className="text-xl">
          <strong>
            {isNaN(updatedTime) ? "DNF" : (updatedTime / 1000).toFixed(2)}
          </strong>
        </p>
        <p>{session.scramble}</p>
        <p>{new Date(session.created_at).toLocaleString()}</p>
        <div className="flex justify-center items-center text-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="radio"
              className="form-radio"
              checked={dnf}
              onChange={() => {
                setDnf(true);
                setExtraTwo(false);
              }}
            />
            DNF
          </label>
          <label className="cursor-pointer flex items-center gap-2">
            <input
              className="form-radio"
              type="radio"
              checked={extraTwo}
              onChange={() => {
                setDnf(false);
                setExtraTwo(true);
              }}
            />
            +2
          </label>
        </div>
        <div className="mt-4 flex justify-center gap-2">
          <button className="btn btn-red" onClick={onClose}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionModal;
