import {ReactNode} from "react";
import {Box} from "@mui/material";

export default function AppLayout({children}: { children: ReactNode }) {
    return (
        <Box
            sx={{
                marginLeft : '2vw',
                marginRight: '2vw'
            }}
        >
            {children}
        </Box>
    )
}
