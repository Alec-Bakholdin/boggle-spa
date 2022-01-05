import {Box, Button, Grid} from '@material-ui/core';
import PropTypes, { string } from 'prop-types';
import { GAME_STATUS_ACTIVE } from '../BoggleLobbySlice';
import BoggleBoard from './BoggleBoard';
import Timer from './Timer';
import WordEntry from './WordEntry';
import WordList from './WordList';

const BoggleGame = ({
    gameStatus,
    players,
    boggleGame,
    words,

    onWordAdd,
    onNewGame
}) => {
    return (
        <Grid 
            container
            direction="column"
            justifyContent="center"
            spacing={2}
        >
            <Grid item children={<Timer endDate={boggleGame.gameOverTime}/>}/>
            <Grid item children={<BoggleBoard boggleBoard={boggleGame.board}/>}/>

            {gameStatus === GAME_STATUS_ACTIVE ?
                <>
                    <Grid item children={<WordEntry onWordAdd={onWordAdd}/>}/>
                    <Grid item children={<WordList words={words}/>}/>
                </>:<>
                    <Box textAlign={"center"}>
                        {players.map(player => <>
                            <br/><br/>
                            {player.username} {player.totalScore}
                            {player.words.map(wordObj => <span>
                                <br/>{wordObj.word} {wordObj.score} 
                                {wordObj.canBeMade ? "" : " (not possible)"}
                                {wordObj.duplicate ? " (duplicate)" : ""}
                                {wordObj.validWord ? "" : " (not a word)"}
                            </span>)}
                        </>)}
                    </Box>
                    <Button variant="contained" onClick={() => onNewGame()}>
                        NEW GAME
                    </Button>
                </>
            }
        </Grid>
    )
}

BoggleGame.propTypes = {
    gameStatus: PropTypes.string.isRequired,
    players: PropTypes.arrayOf(PropTypes.object).isRequired,
    boggleGame: PropTypes.shape({
        boggleBoard: PropTypes.arrayOf(PropTypes.string),
        gameOverTime: PropTypes.number
    }).isRequired,
    words: PropTypes.arrayOf(PropTypes.string).isRequired,

    onWordAdd: PropTypes.func.isRequired,
    onNewGame: PropTypes.func.isRequired
}

export default BoggleGame;