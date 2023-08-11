import {useCoffeeFormula} from "../context/CoffeeDataContext.tsx";
import {Grid, Typography} from "@mui/material";
import MLTimeConverter from "../components/MLTimeConverter.tsx";
import DataPointInputList from "../components/DataPointInputList.tsx";

function IndexPage() {
    const formulaData = useCoffeeFormula();

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography
                    align="center"
                    variant="h1"
                    sx={{
                        fontWeight: 'bold',
                        fontSize  : 'calc(1.5rem + 5vmin)',
                    }}
                >Nestcafe timing caluclator</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>Formula: {formulaData.a}x + {formulaData.b}</Typography>
            </Grid>
            <Grid item xs={12}>
                <MLTimeConverter/>
            </Grid>
        </Grid>

    )
}

export default IndexPage
