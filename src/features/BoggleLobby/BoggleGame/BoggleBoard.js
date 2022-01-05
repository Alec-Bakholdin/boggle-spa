import {Box, Grid} from '@material-ui/core';
import PropTypes from 'prop-types';
import properties from 'src/project-config';

const BoggleBoard = ({boggleBoard}) => {
    return (
        <Grid container display="column" spacing={0}>
            {
                [...Array(5).keys()]
                    .map((row) => <BoggleRow boggleBoard={boggleBoard} rowNum={row}/>)
            }
        </Grid>
    );
}

const BoggleRow = ({boggleBoard, rowNum}) => {
    return (
        <Grid container item display="inline" justifyContent='center'>
            {
                [...Array(5).keys()]
                    .map((colNum) => <BoggleCell boggleBoard={boggleBoard} rowNum={rowNum} colNum={colNum}/>)
            }
        </Grid>
    );
};

const BoggleCell = ({boggleBoard, rowNum, colNum}) => {
    const boardChar = boggleBoard === null ? "" : boggleBoard[rowNum][colNum];
    var boxDim = 100*properties.uiScale;
    return (
        <Box
            margin='2px'
            width={boxDim}
            height={boxDim}
            border="2px solid black"
            borderRadius="10px"
            boxShadow="2px 2px black"
            textAlign="center"
            fontSize={`${5.7*properties.uiScale}rem`}
        >   
            {
                boardChar === 'Q' ? 'Qu' : boardChar
            }
        </Box>
    );
}

BoggleBoard.propTypes = {
    boggleBoard: PropTypes.arrayOf(PropTypes.string)
}

export default BoggleBoard;