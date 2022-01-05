import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/boggleApi";

export const CREATE_LOBBY_PENDING = "CREATE_LOBBY_PENDING";
export const CREATE_LOBBY_READY = "CREATE_LOBBY_READY";
export const CREATE_LOBBY_ERROR = "CREATE_LOBBY_ERROR";

export const GAME_STATUS_INACTIVE = "INACTIVE";
export const GAME_STATUS_ACTIVE = "ACTIVE";
export const GAME_STATUS_FINISHED = "FINISHED";

export const createLobby = createAsyncThunk('boggle/createLobby', async () => {

    return await api.createLobby();
});

const boggleLobbySlice = createSlice({
    name: 'boggle',
    initialState: {
        id: "",
        boggleGame: null,
        players: [],
        status: CREATE_LOBBY_PENDING,
        gameStatus: GAME_STATUS_INACTIVE
    },
    reducers: {
        setLobby: (state, action) => {
            state.id = action.payload.id;
            state.boggleGame = action.payload.game;
            state.players = action.payload.players;
            state.gameStatus = action.payload.gameStatus;
        },
        startGame: (state, action) => {
            state.boggleGame = action.payload;
            console.log(action.payload);
            state.gameStatus = GAME_STATUS_ACTIVE;
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        addPlayer(state, action) {
            let player = action.payload;
            if(!state.players.includes(player)) {
                state.players = [...state.players, player];
            }
        },
        removePlayer(state, action) {
            let player = action.payload;
            if(!state.players.includes(player)) {
                state.players = state.players.filter(item => item.playerId !== player.playerId);
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createLobby.fulfilled, (state, action) => {
                state.status = CREATE_LOBBY_READY;
                state.id = action.payload.id;
                state.boggleGame = action.payload.boggleGame;
                state.players = action.payload.players;
            })
    }
});

export const getBoggleLobbyId = state => state.boggle.id;
export const getBoggleGame = state => state.boggle.boggleGame;
export const getBoggleStatus = state => state.boggle.status;
export const { 
    setLobby, 
    startGame,
    setStatus, 
    addPlayer,
    removePlayer
} = boggleLobbySlice.actions;

export default boggleLobbySlice.reducer;