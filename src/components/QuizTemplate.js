import React from 'react'
import { reduxForm, formValueSelector } from 'redux-form'
import validate from './validate'
import { compose } from 'recompose';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import RenderRadioGroup from './RenderRadioGroup'

// const renderError = ({ meta: { touched, error } }) =>
//     touched && error ? <span>{error}</span> : false

let QuizTemplate = props => {
    const { handleSubmit, previousPage, questionText, questionName, buttons } = props;

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={16}>
                <Grid item xs={12}>
                    <Typography className="questionText" variant="h5">{questionText}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <RenderRadioGroup questionName={questionName} buttons={buttons} />
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={16} justify="center">
                        <Grid item>
                            <Button variant="outlined" type="button" className="previous" onClick={previousPage}>Back</Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary" type="submit" className="next">Next</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    )
}

// Quiz2 = reduxForm({
//   form: 'wizard' // a unique identifier for this form
// })(Quiz2)

// Decorate with connect to read form values

export default compose(
    reduxForm({
        form: 'wizard', //Form name is same
        destroyOnUnmount: false,
        forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
        validate
    }))(QuizTemplate)