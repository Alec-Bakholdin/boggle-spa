import { Button, Grid, Typography } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createLobby, CREATE_LOBBY_PENDING, CREATE_LOBBY_READY, getBoggleLobbyId, getBoggleStatus } from "../BoggleLobby/BoggleLobbySlice";

const BoggleHomeContainer = () => {
    return (
        <Grid 
            container
        >
            <Grid container item xs={12}>
                <BoggleHome />
            </Grid>
        </Grid>
    )
}

const BoggleHome = () => {
    const dispatch = useDispatch();
    const { status, id: lobbyId } = useSelector(state => state.boggle);
    if(status === CREATE_LOBBY_READY) {
        window.location.href = `${window.location.origin}/game/${lobbyId}`
    }

    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={4}
        >
            <Grid item>
                <Typography variant="h1">
                    BOGGLE
                </Typography>
            </Grid>
            <Grid item>
                <Button variant="contained" onClick={() => dispatch(createLobby())}>
                    NEW GAME
                </Button>
                <div>{status} {lobbyId}</div>
            </Grid>
        </Grid>
    );
}

export default BoggleHomeContainer;