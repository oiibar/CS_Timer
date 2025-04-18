import { FC, useState, useEffect } from "react";
import { Session } from "types/types";
import { toast } from "react-toastify";

interface SessionModalProps {
  session: Session | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedSession: Session) => void;
}

const Modal: FC<SessionModalProps> = ({ session, isOpen, onClose, onSave }) => {
  const [extraTwo, setExtraTwo] = useState(false);

  useEffect(() => {
    if (session) {
      setExtraTwo(session.extraTwo);
    }
  }, [session]);

  if (!isOpen || !session) return null;

  const baseTime = session.extraTwo ? session.time - 2000 : session.time;
  const adjustedTime = baseTime + (extraTwo ? 2000 : 0);

  const handleSave = () => {
    onSave({
      ...session,
      time: adjustedTime,
      extraTwo,
    });
    toast.success("Saved successfully");
    onClose();
  };

  return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-slate-700 p-6 rounded-md shadow-md w-96 max-w-[90%] text-center">
          <h2 className="text-2xl font-semibold mb-2">Session Details</h2>

          <div className="text-xl font-bold mb-1">
            {isNaN(adjustedTime) ? "DNF" : (adjustedTime / 1000).toFixed(2)}s
          </div>

          <p className="text-sm text-slate-300">{session.scramble}</p>
          <p className="text-xs text-slate-400 mb-4">
            {new Date(session.created_at).toLocaleString()}
          </p>

          <label className="flex items-center justify-center gap-2 text-sm mb-4">
            <input
                type="checkbox"
                className="w-4 h-4 cursor-pointer"
                checked={extraTwo}
                onChange={() => setExtraTwo((prev) => !prev)}
            />
            +2 seconds
          </label>

          <div className="flex justify-center gap-4">
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

export default Modal;
