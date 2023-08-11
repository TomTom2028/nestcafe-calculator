import {ReactNode} from "react";
import { useRegisterSW } from 'virtual:pwa-register/react'
import {Alert, AlertTitle, Box, Button, Snackbar, Typography} from "@mui/material";
export default function ServiceWorkerWrapper ({children}: {children: ReactNode}) {

    const {needRefresh: needRefreshState, updateServiceWorker} = useRegisterSW()
    const [needRefresh] = needRefreshState

    return (
        <>
            {children}
            <Snackbar open={needRefresh} anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
            }}>
                <Alert variant="filled" severity="warning">
                    <AlertTitle><Typography color="white">New version!</Typography></AlertTitle>
                    <Typography color="white"><Box sx={{mr: '1em', display: 'inline'}}>A new version is available!</Box>
                        <Button
                            variant="contained"
                            onClick={() => {
                                updateServiceWorker(true);
                            }}
                        >Press here to update!</Button>
                    </Typography>
                </Alert>
            </Snackbar>
        </>
    )
}
