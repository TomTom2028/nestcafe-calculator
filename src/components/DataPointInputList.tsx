import {Box, Button, Stack, Typography, useTheme} from "@mui/material";
import DataPointInput from "./DataPointInput.tsx";
import {DataPoint, GuiDataPoint} from "../types/dataPoint.ts";
import {useSaveDataPoints, useUnProcessedDataPoints} from "../context/CoffeeDataContext.tsx";


export default function DataPointInputList() {
    const theme = useTheme()

    const [unProcessedDataPoints, setUnProcessedDataPoints] = useUnProcessedDataPoints();


    const toDisplayDataPoints = [...unProcessedDataPoints, {seconds: '', milliliter: ''}]

    function setMilliliters(index: number, milliliters: string) {
        if (shouldAppendDataPoint(index, unProcessedDataPoints)) {
            setUnProcessedDataPoints((dataPoints) => {
                const newDataPoints = [
                    ...dataPoints,
                    {
                        milliliter: milliliters,
                        seconds: '',
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

    function setTimeSeconds(index: number, timeSeconds: string) {
        if (shouldAppendDataPoint(index, unProcessedDataPoints)) {
            setUnProcessedDataPoints((dataPoints) => {
                return [
                    ...dataPoints,
                    {
                        milliliter: '',
                        seconds: timeSeconds,
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
                                key={index}
                                milliliters={dataPoint.milliliter}
                                timeSeconds={dataPoint.seconds}
                                setMilliliters={(milliliters) => setMilliliters(index, milliliters)}
                                setTimeSeconds={(timeSeconds) => setTimeSeconds(index, timeSeconds)}
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
