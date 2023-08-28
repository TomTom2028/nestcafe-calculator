import {actionCb} from "../types/helperTypes.ts";
import {useEffect, useState} from "react";

export function useTimer(timeToEndMs: number) {
    const [intervalId, setIntervalId] = useState<null | number>(null);
    const [endDate, setEndDate] = useState<null | Date>(null);


    const [remainingMs, setRemainingMs] = useState<number>(0);
    const [percentageCompleted, setPercentageCompleted] = useState<number>(0);

    const [timerCompleted, setTimerCompleted] = useState<boolean>(false);



    function clearIntervalCb() {
        return;
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
    }

    function updateFields(currentDate: Date, currentEndDate: Date) {
        let remainingMs = currentEndDate.getTime() - currentDate.getTime();
        console.log(remainingMs)
        if (remainingMs <= 0) {
           remainingMs = 0;
           setTimerCompleted(true);
           clearIntervalCb();
        }
        setRemainingMs(remainingMs);
        setPercentageCompleted(1 - (remainingMs / timeToEndMs));
    }

    function intervalCb() {
        if (!endDate) return;
        updateFields(new Date(), endDate);
    }

    function startCb() {
        if (intervalId) return;
        const generatedDate = new Date();
        const generatedEndDate = new Date(generatedDate.getTime() + timeToEndMs);
        setEndDate(generatedEndDate);
        resetCb();
        updateFields(generatedDate, generatedEndDate);
        setIntervalId(setInterval(intervalCb, 100));
    }
    

    function resetCb() {
        clearIntervalCb();
        setRemainingMs(0);
        setPercentageCompleted(0);
        setTimerCompleted(false);
    }


    return {
        remainingMs,
        percentageCompleted,
        timerCompleted,
        startCb,
        resetCb,
    }



}

