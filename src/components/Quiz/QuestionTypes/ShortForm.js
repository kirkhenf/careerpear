import React from "react";
import Grid from "@material-ui/core/Grid";
import Grow from "@material-ui/core/Grow";
import { Field } from "react-final-form";
import { TextField } from "final-form-material-ui";
import Typography from "@material-ui/core/Typography";

export default class ShortForm extends React.Component {
    render() {
        return (
            <Grid container spacing={16}>
                <Grid item xs={12}>
                    <Typography className="questionText" variant="h5">{this.props.Question}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grow timeout={500} in={true}>
                        <Field
                            name={this.props.FieldName}
                            type="text"
                            component={TextField}
                            label={this.props.Placeholder}
                            margin="normal"
                            variant="outlined"
                            fullWidth
                        ></Field>
                    </Grow>
                </Grid>
            </Grid>
        );
    }
}