import { ChangeEvent, FC, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@store/hooks.ts";
import { selectScramble, setScramble, setSelectedType } from "@store/scramble/scramble.slice.ts";
import scrambleGenerators from "@services/ScrambleGenerators.ts";

const Scrumble: FC = () => {
    const dispatch = useAppDispatch();
    const scrambles = useAppSelector(selectScramble);
    const selectedType = useAppSelector(state => state.scramble.selectedType);

    const scrambleTypes = Array.from(new Set(scrambles.map(s => s.type)));

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newType = e.target.value;
        dispatch(setSelectedType(newType));
    };

    const selectedScramble = scrambles.find(s => s.type === selectedType);

    useEffect(() => {
        if (selectedType && scrambleGenerators[selectedType]) {
            const newScramble = scrambleGenerators[selectedType]();
            dispatch(setScramble({ type: selectedType, scramble: newScramble }));
        }
    }, [selectedType, dispatch]);


    return (
        <div className="flex gap-4">
            <select
                value={selectedType}
                onChange={handleChange}
                className="text-black p-2 rounded"
            >
                <option value="">Select scramble type</option>
                {scrambleTypes.map((type) => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
            </select>

            <div className="flex gap-2 text-lg flex-wrap">
                {selectedScramble ? (
                    <span>{selectedScramble.scramble}</span>
                ) : (
                    <span>Please select a scramble type</span>
                )}
            </div>
        </div>
    );
};

export default Scrumble;
