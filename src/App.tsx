import DataPointInputList from "./components/DataPointInputList.tsx";
import {Grid, Typography} from "@mui/material";
import AppLayout from "./layouts/AppLayout.tsx";


function App() {

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
                  <DataPointInputList/>
              </Grid>
          </Grid>
      </AppLayout>

  )
}

export default App
