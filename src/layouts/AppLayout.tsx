import {ReactNode} from "react";
import {Box} from "@mui/material";
import Navbar from "../components/Navbar.tsx";

export default function AppLayout({children}: { children: ReactNode }) {
    return (
        <>
            <Navbar/>
            <Box
                sx={{
                    marginLeft : '2vw',
                    marginRight: '2vw',
                }}
            >
               {children}
            </Box>
        </>
    )
}
