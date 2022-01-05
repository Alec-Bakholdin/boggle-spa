import PropTypes from 'prop-types';

const BogglePlayerList = ({players, selfPlayerId}) => {
    return (<>
        Players:
            <ul>
                {players === null ? "" : 
                    players.map(player => <li key={player.playerId}>
                            {player.username}
                            {player.playerId === selfPlayerId ? " (me)" : ""}
                        </li>)
                }
            </ul>
    </>)
}

export default BogglePlayerList;