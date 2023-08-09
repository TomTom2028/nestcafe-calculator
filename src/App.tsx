import DataPointInputList from "./components/DataPointInputList.tsx";
import {Grid, Typography} from "@mui/material";
import AppLayout from "./layouts/AppLayout.tsx";
import MLTimeConverter from "./components/MLTimeConverter.tsx";
import {useCoffeeFormula} from "./context/CoffeeDataContext.tsx";


function App() {
    const formulaData = useCoffeeFormula();

  return (
      <AppLayout>
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
              <Grid item xs={12}>
                  <DataPointInputList/>
              </Grid>
          </Grid>
      </AppLayout>

  )
}

export default App
