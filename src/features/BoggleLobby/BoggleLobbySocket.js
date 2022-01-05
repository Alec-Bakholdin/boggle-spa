import properties from 'src/project-config.json';
import SockJsClient from 'react-stomp';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPlayer, setLobby, removePlayer, startGame } from './BoggleLobbySlice';
import { initializeSelf, resetWords } from './BogglePlayerSlice';
import { Metronome } from 'react-metronome';

const BoggleLobbySocket = ({
    lobbyId,
    username,
    socketRef
}) => {
    const [socket, setSocket] = useState(null);
    const {playerId} = useSelector(state => state.player);
    const {players} = useSelector(state => state.boggle);
    const dispatch = useDispatch();

    const joinRequest = {
        username,
        lobbyId
    }
    useEffect(() => {
        var interval = null;
        if(playerId && socket) {
            interval = setInterval(() => {
                socket.sendMessage("/app/heartbeat", playerId);
            }, 1000)
        } else {
            clearInterval(interval);
            interval = null;
        }
    }, [playerId, socket]);
        
        
    /*<Metronome
    onTick={() => {
        if(socket && playerId)
        socket.sendMessage("/app/heartbeat", playerId)
    }}
    period={500}
/>*/
        

    return <>

        <SockJsClient
            url={properties.socketConnectUrl}
            topics={getSubscribedTopics(lobbyId, username)}
            ref={ref => {
                setSocket(ref);
                socketRef(ref);
            }}

            onConnect={() => {
                console.log(`Connected as user ${username}, requesting to join lobby`);
                socket.sendMessage("/app/joinLobby", JSON.stringify(joinRequest));
            }}
            onDisconnect={() => console.log("Disconnected")}

            onMessage={(message, topic) => {
                console.log(`Topic: ${topic}`, message);
                switch(topic) {
                    case `/topic/game/${lobbyId}/endGame`:
                    case `/user/${username}/joinLobby`:
                        dispatch(resetWords());
                        dispatch(setLobby(message));
                        return;
                    case `/topic/game/${lobbyId}/playerJoin`:
                        if(players.filter(player => player.playerId === message.playerId).length > 0) {
                            dispatch(initializeSelf(message));
                        } else {
                            dispatch(addPlayer(message));
                        }
                        return;
                    case `/topic/game/${lobbyId}/playerLeave`:
                        dispatch(removePlayer(message));
                        return;
                    case `/topic/game/${lobbyId}/startGame`:
                        dispatch(startGame(message));
                        return;
                    default:
                        console.error(`Unexpected topic ${topic} with message ${message}`);
                }
            }}
        />
    </>
}

const getSubscribedTopics = (lobbyId, username) => {
    return [
        `/topic/game/${lobbyId}/playerJoin`,
        `/topic/game/${lobbyId}/playerLeave`,
        `/topic/game/${lobbyId}/startGame`,
        `/topic/game/${lobbyId}/endGame`,
        `/user/${username}/joinLobby`,
        '/reply/queue/joiningLobby',
    ]
}

BoggleLobbySocket.propTypes = {
    lobbyId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    socketRef: PropTypes.func.isRequired
}

export default BoggleLobbySocket;