import {AppBar, MenuItem, Toolbar, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    return (
        <AppBar position="sticky">
            <Toolbar>
                <MenuItem onClick={() => navigate('/')}>
                    <Typography textAlign="center" color="secondary.light">Home</Typography>
                </MenuItem>
                <MenuItem onClick={() => navigate('/data-entry')}>
                    <Typography textAlign="center" color="secondary.light">Data entry</Typography>
                </MenuItem>
            </Toolbar>
        </AppBar>
    )
}
