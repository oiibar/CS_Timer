import React, { useState, useEffect, useCallback } from "react";
import TimerDisplay from "./TimerDisplay.tsx";
import AverageDisplay from "./AverageDisplay.tsx";
import ResetButton from "./ResetButton.tsx";
import { useAppDispatch, useAppSelector } from "@store/hooks.ts";
import { selectScramble, selectSelectedType, setScramble } from "@store/scramble/scramble.slice.ts";
import { Session } from "@interfaces/sessions";
import calculateAverage from "@services/calculateAvg.service.ts";
import scrambleGenerators from "@services/scramble/ScrambleGenerators.ts";

interface Props {
    sessions: Session[];
    onAdd: (newSession: Omit<Session, "id" | "created_at">) => Promise<void>;
}

const MainTimer: React.FC<Props> = ({ sessions, onAdd }) => {
    const [startTime, setStartTime] = useState<number | null>(null);
    const [running, setRunning] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [holdStart, setHoldStart] = useState<number | null>(null);
    const [status, setStatus] = useState<'default' | 'holding' | 'ready' | 'running'>('default');
    const [submitted, setSubmitted] = useState(false);
    const [showNewPB, setShowNewPB] = useState(false);

    const dispatch = useAppDispatch();
    const scrambles = useAppSelector(selectScramble);
    const selectedType = useAppSelector(selectSelectedType);


    const selectedScramble = scrambles.find(s => s.type === selectedType);

    const startTimer = () => {
        setStartTime(Date.now());
        setTimeElapsed(0);
        setRunning(true);
        setSubmitted(false);
        setStatus('running');
        setShowNewPB(false);
    };
    const stopTimer = () => {
        setRunning(false);
        setStatus('default');
    };
    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.code === "Space") {
            event.preventDefault();
        }
        if (event.code !== "Space" || running || holdStart) return;

        const now = Date.now();
        setHoldStart(now);
        setStatus('holding');

        const holdCheckTimeout = setTimeout(() => {
            if (Date.now() - now >= 500) {
                setStatus('ready');
            }
        }, 500);

        return () => clearTimeout(holdCheckTimeout);
    }, [running, holdStart]);
    const handleKeyUp = useCallback((event: KeyboardEvent) => {
        if (event.code !== "Space") return;

        if (running) {
            stopTimer();
        } else if (status === 'ready') {
            startTimer();
        }

        setHoldStart(null);
        if (!running) {
            setStatus('default');
        }
    }, [running, status]);
    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("keyup", handleKeyUp);
        };
    }, [handleKeyDown, handleKeyUp]);
    useEffect(() => {
        if (!running) return;

        const interval = setInterval(() => {
            if (startTime) {
                setTimeElapsed(Date.now() - startTime);
            }
        }, 10);

        return () => clearInterval(interval);
    }, [running, startTime]);
    useEffect(() => {
        if (!running && startTime && !submitted && status === 'default') {
            const elapsed = Date.now() - startTime;
            setTimeElapsed(elapsed);
            setSubmitted(true);
            handleSubmitSession(elapsed);
        }
    }, [running, startTime, submitted, status]);

    const handleSubmitSession = async (elapsed: number) => {
        const scrambleToSubmit = selectedScramble?.scramble || "";
        const discipline = selectedScramble?.type || "";

        const currentBest = sessions.length > 0
            ? Math.min(...sessions.map(s => s.time))
            : Infinity;

        await onAdd({
            time: elapsed,
            scramble: scrambleToSubmit,
            extraTwo: false,
            discipline: discipline,
            DNF: false,
            updated_at: ""
        });

        if (elapsed < currentBest) {
            setShowNewPB(true);
        } else {
            setShowNewPB(false);
        }

        const generator = scrambleGenerators[selectedType];
        if (generator) {
            dispatch(setScramble({ type: selectedType, scramble: generator() }));
        }
    };
    const handleReset = () => {
        setStartTime(null);
        setRunning(false);
        setTimeElapsed(0);
        setSubmitted(false);
        setStatus('default');
        setShowNewPB(false);
    };

    return (
        <div className="text-center flex gap-6 flex-col">
            <TimerDisplay timeElapsed={timeElapsed} status={status} sessions={sessions} showNewPB={showNewPB} />
            <AverageDisplay ao5={calculateAverage(sessions, 5)} ao12={calculateAverage(sessions, 12)} />
            <ResetButton onClick={handleReset} />
        </div>
    );
};

export default MainTimer;
