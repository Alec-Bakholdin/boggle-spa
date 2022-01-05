import { Button, Grid, TextField } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useState } from "react";
import PropTypes from 'prop-types';
import properties from 'src/project-config';

const WordEntry = ({onWordAdd}) => {
    var fontSize = 30*properties.uiScale;
    const [word, setWord] = useState("");

    return (
        <Grid 
            container 
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
        >
            <Grid item>
                <TextField
                    variant="filled"
                    InputProps={{hiddenLabel: true, style: {fontSize}}}
                    onChange={(e) => handleChange(e, setWord)}
                    onKeyDown={(e) => {
                        if(e.key === 'Enter' && word.length >= 4) {
                            onWordAdd(word);
                            setWord("");
                        }
                    }}
                    value={word}
                />
            </Grid>
            <Grid>
                <Button
                    type="submit"
                    variant="contained"
                    style={{fontSize}}
                    onClick={(e) => {
                        if(word.length >= 4) {
                            onWordAdd(word);
                            setWord("");
                        }
                    }}
                >
                    OK
                </Button>
            </Grid>
        </Grid>
    )
}

const handleChange = (e, setWord) => {
    setWord(e.currentTarget.value.replace(/[^A-Za-z]/, "").toUpperCase());
}

WordEntry.propTypes = {
    onWordAdd: PropTypes.func.isRequired
};

export default WordEntry;