import React, { useState, useEffect, useCallback } from "react";
import { useSubmit } from "react-router-dom";

import TimerDisplay from "./TimerDisplay.tsx";
import AverageDisplay from "./AverageDisplay.tsx";
import ResetButton from "./ResetButton.tsx";

import { instance } from "../../api/axios.api.ts";

import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import { selectScramble, setScramble } from "../../store/scramble/scramble.slice.ts";
import { Session } from "../../types/types.ts";

import generateScramble from "../../services/scramble.service.ts";
import calculateAverage from "../../services/calculateAvg.service.ts";


interface Props {
    sessions: Session[];
    setSessions: (sessions: Session[]) => void;
}

const MainTimer: React.FC<Props> = ({ sessions, setSessions }) => {
    const [startTime, setStartTime] = useState<number | null>(null);
    const [running, setRunning] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [spacePressed, setSpacePressed] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const submit = useSubmit();
    const dispatch = useAppDispatch();
    const scramble = useAppSelector(selectScramble);


    const startTimer = () => {
        setStartTime(Date.now());
        setTimeElapsed(0);
        setRunning(true);
        setSubmitted(false);
    };
    const stopTimer = () => {
        setRunning(false);
    };
    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.code !== "Space" || spacePressed) return;

        setSpacePressed(true);
        running ? stopTimer() : startTimer();
    }, [spacePressed, running]);
    const handleKeyUp = useCallback((event: KeyboardEvent) => {
        if (event.code === "Space") {
            setSpacePressed(false);
        }
    }, []);

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
        if (!running && startTime && !submitted) {
            const elapsed = Date.now() - startTime;
            setTimeElapsed(elapsed);
            setSubmitted(true);
            handleSubmitSession(elapsed);
        }
    }, [running, startTime, submitted]);

    const handleSubmitSession = async (elapsed: number) => {
        submit(
            {
                time: elapsed.toString(),
                scramble,
                extraTwo: false,
                DNF: false,
            },
            { method: "POST", action: "/sessions" }
        );

        dispatch(setScramble(generateScramble()));
        const { data } = await instance.get<Session[]>("/sessions");
        setSessions(data);
    };
    const handleReset = () => {
        setStartTime(null);
        setRunning(false);
        setTimeElapsed(0);
        setSubmitted(false);
    };

    return (
        <div className="text-center flex gap-6 flex-col">
            <TimerDisplay timeElapsed={timeElapsed} />
            <AverageDisplay ao5={calculateAverage(sessions, 5)} ao12={calculateAverage(sessions, 12)} />
            <ResetButton onClick={handleReset} />
        </div>
    );
};

export default MainTimer;
