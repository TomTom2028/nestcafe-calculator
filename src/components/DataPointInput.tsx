import {Box, Grid, IconButton, InputAdornment, Paper, TextField} from "@mui/material";
import {useId} from "react";
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CloseIcon from '@mui/icons-material/Close';
import {useIsMobile, useThemeBreakPoint} from "../hooks/themeBreakPoint.ts";

type DataPointProps = {
    milliliters: string,
    timeSeconds: string,
    setMilliliters: (milliliters: string) => void,
    setTimeSeconds: (timeSeconds: string) => void,
    onRemove: () => void,
}
export default function DataPointInput(props: DataPointProps) {
    const isMobile = useThemeBreakPoint('sm');
    const id = useId();

    return (
        <Paper sx={{
            position: 'relative',
            width: '100%',
            padding: '1rem',
        }}>
            <Grid container spacing={2} paddingRight={isMobile ? '1.5rem' : undefined}>
                <Grid item sm={6} xs={12}>
                    <TextField
                        value={props.milliliters}
                        onChange={(e) => props.setMilliliters(e.target.value)}
                        label="fluid amount (ml)"
                        fullWidth
                        id={`milliliter-${id}`}
                        type="number"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <WaterDropIcon/>
                                </InputAdornment>
                            )
                        }}
                    />
                </Grid>
                <Grid item sm={5} xs={12}>
                    <TextField
                        value={props.timeSeconds}
                        onChange={(e) => props.setTimeSeconds(e.target.value)}
                        fullWidth
                        label="time (seconds)"
                        id={`timeSeconds-${id}`}
                        type="number"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <AccessTimeIcon/>
                                </InputAdornment>
                            )
                        }}
                    />
                </Grid>
                {
                    !isMobile && (
                        <Grid item sm={1} xs={12} sx={{
                            display: 'grid',
                            placeItems: 'center',
                        }}>
                            <IconButton
                                onClick={() => props.onRemove()}
                            >
                                <CloseIcon/>
                            </IconButton>
                        </Grid>
                    )
                }
            </Grid>
            {
                isMobile && (
                    <Box sx={{
                        position: 'absolute',
                        top: '0',
                        right: '0'
                    }}>
                        <IconButton
                            onClick={() => props.onRemove()}
                        >
                            <CloseIcon/>
                        </IconButton>
                    </Box>
                )
            }
        </Paper>
    )
}
