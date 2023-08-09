import {Box, Grid, Paper, TextField, Typography} from "@mui/material";
import {useCoffeeFormula} from "../context/CoffeeDataContext.tsx";
import {useState} from "react";

export default function MLTimeConverter() {
    const formulaData = useCoffeeFormula();
    const [fluidAmountStr, setFluidAmountStr] = useState('');

    const parsedFluidAmount = isNaN(Number(fluidAmountStr)) ? 0 : Number(fluidAmountStr);

    const calculatedSeconds = formulaData.a * parsedFluidAmount + formulaData.b;
    const roundedSeconds = Math.round(calculatedSeconds * 100) / 100;
    return (
       <Box>
           <Typography>Calc:</Typography>
           <Paper>
               <Grid container padding={2} spacing={2}>
                   <Grid item xs={12}>
                       <TextField
                           value={fluidAmountStr}
                           onChange={e => setFluidAmountStr(e.target.value)}
                           fullWidth
                           type="number"
                           label="Fluid amount(ml)"
                       />
                   </Grid>
                   <Grid item xs={12}>
                       <Typography>Is equal to {roundedSeconds} seconds!</Typography>
                   </Grid>
               </Grid>
           </Paper>
       </Box>
    )
}
