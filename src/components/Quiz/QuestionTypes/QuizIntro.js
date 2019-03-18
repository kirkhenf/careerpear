import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";


export default class QuizIntro extends React.Component {

    render() {
        return (
            <Grid container spacing = {16}>
                <Grid item xs={12}>
                    <Typography className = "questionText" variant = "h5">Let's get you <i>pear</i>-ed!</Typography>
                </Grid>
            </Grid>
        )
    }
}