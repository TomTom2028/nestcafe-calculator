import {createTheme} from "@mui/material";

const theme = createTheme({
    palette: {
        background: {
            default: '#FFE8D6',
            paper: '#f8efe1'
        },
        primary: {
            main: '#6B705C'
        }
    },
    components: {
        MuiTypography: {
            defaultProps: {
                color: 'primary.dark'
            }
        }
    }
})


export default theme
