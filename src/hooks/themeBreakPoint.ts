import {Breakpoint, useMediaQuery, useTheme} from "@mui/material";

export function useThemeBreakPoint(breakPoint: Breakpoint) {
    const theme = useTheme();
    return useMediaQuery(theme.breakpoints.down(breakPoint))
}
export function useIsMobile() {
    return useThemeBreakPoint('sm');
}
