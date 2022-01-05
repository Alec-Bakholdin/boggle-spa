import { configureStore } from "@reduxjs/toolkit";
import boggle from 'src/features/BoggleLobby/BoggleLobbySlice'
import player from "src/features/BoggleLobby/BogglePlayerSlice";

export default configureStore({
    reducer: {
        boggle: boggle,
        player: player
    }
});