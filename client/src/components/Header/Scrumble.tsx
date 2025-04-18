import { FC } from "react";
import { useAppSelector } from "store/hooks.ts";
import { selectScramble } from "store/scramble/scramble.slice.ts";

const Scrumble: FC = () => {
    const scramble = useAppSelector(selectScramble);


    return (
        <div className="flex gap-2 text-lg flex-wrap">
            {scramble ? (
                scramble
                    .split(" ")
                    .map((move, index) => <span key={index}>{move}</span>)
            ) : (
                <span>No scramble available</span>
            )}
        </div>
    );
};

export default Scrumble;
