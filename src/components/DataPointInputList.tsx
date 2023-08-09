import {Box, Stack, Typography} from "@mui/material";
import DataPointInput from "./DataPointInput.tsx";

export default function DataPointInputList() {
    return (
        <Stack
            spacing={2}
            sx={{
                backgroundColor: 'primary.main',
                alignItems: 'center',
            }}
        >
            <DataPointInput/>
        </Stack>
    )
}
