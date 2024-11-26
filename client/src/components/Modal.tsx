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
  const [extraTwo, setExtraTwo] = useState(session?.extraTwo || false);
  const [updatedTime, setUpdatedTime] = useState(session?.time || 0);

  useEffect(() => {
    if (session) {
      setExtraTwo(session.extraTwo);
      setUpdatedTime(session.time);
    }
  }, [session]);

  const handleSave = () => {
    let newTime = updatedTime;
    // If extraTwo checkbox is checked, add 2000 milliseconds (2 seconds)
    if (extraTwo) {
      newTime += 2000;
    } else {
      // If unchecked, subtract 2000 milliseconds (2 seconds)
      newTime -= 2000;
    }

    if (session) {
      onSave({ ...session, time: newTime, extraTwo: extraTwo });
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
              type="checkbox"
              className="w-4 h-4 cursor-pointer"
              checked={extraTwo}
              onChange={() => setExtraTwo(!extraTwo)} // Toggle the checkbox state
            />
            +2 seconds
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
