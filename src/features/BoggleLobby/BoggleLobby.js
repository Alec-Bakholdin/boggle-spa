import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { GAME_STATUS_INACTIVE } from './BoggleLobbySlice';
import BoggleLobbySocket from './BoggleLobbySocket';
import { boggleAddWord, boggleStartGame } from './BoggleSocketTopics';
import BoggleGame from './BoggleGame/BoggleGame';
import BogglePlayerList from './BogglePlayerList';
import { addWord, resetWords } from './BogglePlayerSlice';

const BoggleLobby = () => {
    const dispatch = useDispatch();
    const urlId = /\/([\w-]+)$/g.exec(window.location.href)[1];
    
    const {id: lobbyId, players, gameStatus, boggleGame} = useSelector(state => state.boggle);
    const {playerId, words} = useSelector(state => state.player);
    
    const [socket, setSocket] = useState(null);
    const [username] = useState(`test_${parseInt(Math.random() * 1000)}`);
    const newGame = () => {
        boggleStartGame(socket, lobbyId);
    }
    return  (
        <>
            
            {
                gameStatus !== GAME_STATUS_INACTIVE ? 
                    <BoggleGame 
                        players={players}
                        gameStatus={gameStatus}
                        boggleGame={boggleGame}
                        words={words}
                        onWordAdd={(newWord) => {
                            if(words.filter(word => word === newWord).length === 0) {
                                console.log(`Added new word ${newWord}`);
                                dispatch(addWord(newWord));
                                boggleAddWord(socket, lobbyId, playerId, newWord);
                            }
                        }}
                        onNewGame={() => newGame()}
                    /> :
                    <Button
                        variant="contained"
                        onClick={() => newGame()}
                    >
                        START GAME
                    </Button>

            }
            <BogglePlayerList
                players={players}
                selfPlayerId={playerId}
            />

            <BoggleLobbySocket
                lobbyId={urlId}
                username={username}
                socketRef={ref => setSocket(ref)}
            />
        </>
    );
};

export default BoggleLobby;