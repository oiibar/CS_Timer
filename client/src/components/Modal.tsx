import { FC } from "react";
import { Form } from "react-router-dom";
import { Session } from "../types/types";

interface IModal {
  type: "post" | "patch";
  id?: number;
  setVisibleModal: (visible: boolean) => void;
  sessions: object;
}

const Modal: FC<IModal> = ({ type, id, setVisibleModal, sessions }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">
      <Form
        action="/sessions"
        method="patch"
        onSubmit={() => setVisibleModal(false)}
        className="grid gap-2 w-[300px] p-5 rounded-md bg-slate-900"
      >
        <div className="flex flex-col gap-2 text-center">
          <p className="text-3xl">4.73</p>
          <p>ADFADFA</p>
          <p>16 May</p>
        </div>

        <div className="flex items-center text-center mt-2 justify-center gap-2">
          <button className="btn btn-green" type="submit">
            Save
          </button>
          <button
            onClick={() => setVisibleModal(false)}
            className="btn btn-red"
          >
            Close
          </button>
        </div>
      </Form>
    </div>
  );
};

export default Modal;
