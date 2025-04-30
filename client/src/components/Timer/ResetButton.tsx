import React from "react";

interface Props {
    onClick: () => void;
}

const ResetButton: React.FC<Props> = ({ onClick }) => (
    <button className="btn btn-red w-fit mx-auto" onClick={onClick}>
        Reset
    </button>
);

export default ResetButton;
