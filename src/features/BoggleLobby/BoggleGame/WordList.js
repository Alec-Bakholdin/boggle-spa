import { Box, Grid, Typography } from "@material-ui/core";
import PropTypes from 'prop-types';


const WordList = ({words}) => {
    return (
        <Grid 
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
            {
                words === null ? "" : 
                words.map((word) => (
                    <Grid item>
                        <Typography
                            
                        >
                            {word}
                        </Typography>
                    </Grid>
                ))
            }
        </Grid>
    );
}

WordList.propTypes = {
    words: PropTypes.arrayOf(PropTypes.string)
}

export default WordList;