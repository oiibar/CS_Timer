import { FC, useState, useEffect } from "react";
import { Session } from "types/types";
import { toast } from "react-toastify";

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
  onSave,
}) => {
  const [dnf, setDnf] = useState(session?.DNF || false);
  const [extraTwo, setExtraTwo] = useState(session?.extraTwo || false);
  const [updatedTime, setUpdatedTime] = useState(session?.time || 0);

  useEffect(() => {
    if (session) {
      setDnf(session.DNF);
      setExtraTwo(session.extraTwo);
      setUpdatedTime(session.time);
    }
  }, [session]);

  const handleSave = () => {
    let newTime = session?.time || 0;
    if (extraTwo) {
      newTime += 2000;
    }
    if (session) {
      onSave({ ...session, time: newTime, DNF: dnf, extraTwo: extraTwo });
      toast.success("Saved successfully");
    }
    onClose();
  };

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
          <label className="flex items-center gap-2">
            <input
              type="radio"
              className="w-4 h-4 cursor-pointer"
              checked={dnf}
              onChange={() => {
                setDnf(true);
                setExtraTwo(false);
              }}
            />
            DNF
          </label>
          <label className="flex items-center gap-2">
            <input
              className="w-4 h-4 cursor-pointer"
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
          <button className="btn btn-green" onClick={handleSave}>
            Save
          </button>
          <button className="btn btn-red" onClick={onClose}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionModal;
