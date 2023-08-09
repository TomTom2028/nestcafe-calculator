import {Box, Button, Stack, Typography, useTheme} from "@mui/material";
import DataPointInput from "./DataPointInput.tsx";
import {GuiDataPoint} from "../types/dataPoint.ts";
import {useSaveDataPoints, useUnProcessedDataPoints} from "../context/CoffeeDataContext.tsx";
import { v4 as uuid } from 'uuid';


export default function DataPointInputList() {
    const theme = useTheme()

    const [unProcessedDataPoints, setUnProcessedDataPoints] = useUnProcessedDataPoints();


    const toDisplayDataPoints: GuiDataPoint[] = [...unProcessedDataPoints, {seconds: '', milliliter: '', id: uuid()}]

    function setMilliliters(index: number, uuid: string, milliliters: string) {
        if (shouldAppendDataPoint(index, unProcessedDataPoints)) {
            setUnProcessedDataPoints((dataPoints) => {
                const newDataPoints = [
                    ...dataPoints,
                    {
                        milliliter: milliliters,
                        seconds: '',
                        id: uuid,
                    }
                ]
                console.log(newDataPoints)
                return newDataPoints
            })
        } else {
            setUnProcessedDataPoints((dataPoints) => {
                const newDataPoints = [...dataPoints]
                newDataPoints[index].milliliter = milliliters
                return newDataPoints
            })
        }
    }

    function setTimeSeconds(index: number, uuid: string, timeSeconds: string) {
        if (shouldAppendDataPoint(index, unProcessedDataPoints)) {
            setUnProcessedDataPoints((dataPoints) => {
                return [
                    ...dataPoints,
                    {
                        milliliter: '',
                        seconds: timeSeconds,
                        id: uuid,
                    }
                ]
            })
        } else {
            setUnProcessedDataPoints((dataPoints) => {
                const newDataPoints = [...dataPoints]
                newDataPoints[index].seconds = timeSeconds
                return newDataPoints
            })
        }
    }

    function removeDataPoint(index: number) {
        setUnProcessedDataPoints((dataPoints) => {
            const lastDataPoint = dataPoints[dataPoints.length - 1]
            const toSpliceIndex = index > dataPoints.length - 1
            && lastDataPoint.seconds === ''
            && lastDataPoint.milliliter === ''? dataPoints.length - 1 : index
            const newDataPoints = [...dataPoints]
            newDataPoints.splice(toSpliceIndex, 1)
            return newDataPoints
        })
    }

    const saveFunction = useSaveDataPoints();

    return (
        <Box sx={{
            padding: '0.5rem'
        }}>
            <Typography>Time inputs</Typography>
            <Stack

                spacing={2}
                sx={{
                    backgroundColor: 'primary.light',
                    border: `3px solid ${theme.palette.primary.dark}`,
                    borderRadius: '5px',
                    padding: '0.5rem',
                    alignItems: 'center',
                }}
            >
                <Button variant="contained" color="secondary" onClick={saveFunction}>Save!</Button>
                {
                    toDisplayDataPoints.map((dataPoint, index) => {
                        return (
                            <DataPointInput
                                key={dataPoint.id}
                                milliliters={dataPoint.milliliter}
                                timeSeconds={dataPoint.seconds}
                                setMilliliters={(milliliters) => setMilliliters(index, dataPoint.id, milliliters)}
                                setTimeSeconds={(timeSeconds) => setTimeSeconds(index, dataPoint.id, timeSeconds)}
                                onRemove={() => removeDataPoint(index)}


                            />

                        )
                    })
                }
            </Stack
                >
        </Box>

    )
}


function shouldAppendDataPoint(index: number, dataPoints: GuiDataPoint[]) {
    return dataPoints.length <= index;
}
