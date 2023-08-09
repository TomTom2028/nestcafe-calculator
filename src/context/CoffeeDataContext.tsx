import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useLayoutEffect,
    useState
} from "react";
import {DataPoint, GuiDataPoint} from "../types/dataPoint.ts";
import { v4 as uuid } from 'uuid';

type CoffeeDataContextType = {
    unProcessedDataPoints: GuiDataPoint[],
    formulaData: {
        a: number,
        b: number,
    },
    setUnProcessedDataPoints: Dispatch<SetStateAction<GuiDataPoint[]>>,
    saveDataPoints (): void,
}

const CoffeeDataContext = createContext<CoffeeDataContextType | null>(null);

export function CoffeeDataContextProvider({children}: { children: ReactNode }) {
    const [unProcessedDataPoints, setUnProcessedDataPoints] = useState<GuiDataPoint[]>([])


    const cleanDataPoints = cleanCoffeeDataPoints(unProcessedDataPoints);


    const formulaData = calculateCofeeFunction(cleanDataPoints)
    function saveDataPoints() {
        localStorage.setItem('data', JSON.stringify(cleanDataPoints));
    }

    useLayoutEffect(() => {
        const restoredData = localStorage.getItem('data');
        if (!restoredData) {
            return;
        }
        const parsedData = JSON.parse(restoredData) as DataPoint[];
        const guiDataPoints: GuiDataPoint[] = parsedData.map(dp => {
            return {
                milliliter: dp.milliliter.toString(),
                seconds: dp.seconds.toString(),
                id: uuid()
            }
        })
        setUnProcessedDataPoints(guiDataPoints)
    }, [])

    return (
        <CoffeeDataContext.Provider value={{
            unProcessedDataPoints,
            setUnProcessedDataPoints,
            formulaData,
            saveDataPoints
        }}>
            {children}
        </CoffeeDataContext.Provider>
        )
}

function useSafeCoffeContext() {
    const context = useContext(CoffeeDataContext);
    if (!context) {
        throw Error("needs to be used in context!")
    }
    return context;
}

export function useUnProcessedDataPoints() {
    const context = useSafeCoffeContext();

    return [context.unProcessedDataPoints, context.setUnProcessedDataPoints] as const;
}

export function useCoffeeFormula() {
    const context = useSafeCoffeContext();
    return context.formulaData;
}

function cleanCoffeeDataPoints(dirtyPoints: GuiDataPoint[]): DataPoint[] {
    return dirtyPoints.filter(dp => {
        if (dp.milliliter === '' || dp.seconds === '') {
            return false;
        }
        if (isNaN(Number(dp.milliliter)) || isNaN(Number(dp.seconds))) {
            return false;
        }
        return true;
    }).map(p => {
        return {
            milliliter: Number(p.milliliter),
            seconds: Number(p.seconds)
        }
    })
}

function calculateCofeeFunction(dataPoints: DataPoint[]) {
    if (dataPoints.length === 0) {
        return {a: 0, b: 0}
    }
    const xyData = dataPoints.map(p => ({x: p.milliliter, y: p.seconds}));
    const meanX = xyData.reduce((acc, point) => acc + point.x, 0) / xyData.length
    const meanY = xyData.reduce((acc, point) => acc + point.y, 0) / xyData.length

    const pointsWithMoreData = xyData.map(point => ({
        ...point,
        topValue: (point.x - meanX) * (point.y - meanY),
        bottomValue: (point.x - meanX) ** 2
    }));

    const totalTopValue = pointsWithMoreData.reduce((acc, point) => acc + point.topValue, 0)
    const totalBottomValue = pointsWithMoreData.reduce((acc, point) => acc + point.bottomValue, 0)

    const a = totalBottomValue !== 0 ?totalTopValue / totalBottomValue : 0;
    const b = meanY - a * meanX;
    return {
        a,
        b
    }
}

export function useSaveDataPoints() {
    const context = useSafeCoffeContext();
    return context.saveDataPoints;
}
