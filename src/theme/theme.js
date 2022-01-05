import { createTheme } from "@material-ui/core";
import { blue, green } from "@material-ui/core/colors";
import properties from 'src/project-config';

const theme = createTheme({
    palette: {
        background: {
            default: green[200]
        },
        primary: {
            main: blue[400]
        }
    },
    typography: {
        h1: {
            fontSize: `${10*properties.uiScale}rem`,
            fontFamily: 'Roboto',
            color: "#000000"
        }
    }
});

export default theme;