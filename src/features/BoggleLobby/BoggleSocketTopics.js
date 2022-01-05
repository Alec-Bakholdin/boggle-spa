
export const boggleStartGame = (socket, lobbyId) => socket.sendMessage(`/app/startGame`, lobbyId);
export const boggleAddWord = (socket, lobbyId, playerId, word) => socket.sendMessage(`/app/addWord`, JSON.stringify({lobbyId, playerId, word}));