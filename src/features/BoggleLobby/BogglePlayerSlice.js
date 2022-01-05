import { createSlice } from "@reduxjs/toolkit";

const bogglePlayerSlice = createSlice({
    name: 'player',
    initialState: {
        username: null,
        lobbyId: null,
        playerId: null,
        host: false,
        words: []
    },
    reducers: {
        initializeSelf: (state, action) => {
            const player = action.payload;
            state.username = player.username;
            state.lobbyId = player.lobbyId;
            state.playerId = player.playerId;
            state.host = player.host
        },
        resetWords: (state) => {
            state.words = [];
        },
        addWord: (state, action) => {
            const newWord = action.payload;
            if(state.words.filter(word => word === newWord).length === 0) {
                state.words = [newWord, ...state.words];
            }
        }
    }
});

export const {
    initializeSelf,
    resetWords,
    addWord
} = bogglePlayerSlice.actions;

export default bogglePlayerSlice.reducer;