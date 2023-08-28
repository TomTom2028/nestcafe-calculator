import {useTimer} from "../hooks/timerHooks.ts";
import {useEffect} from "react";

export default function Timer() {
    const msTimer = 5000;

    const {startCb, percentageCompleted} = useTimer(msTimer);

    useEffect(() => {
        console.log("triggering")
        startCb();
    }, [startCb])

    return (
        <h1>
            {percentageCompleted}
        </h1>
    )
}
