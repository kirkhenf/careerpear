import React from 'react'
import { reduxForm } from 'redux-form'
import validate from './validate'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { Form, Field } from 'react-final-form'
import Button from '@material-ui/core/Button'
import { Checkbox, TextField } from "final-form-material-ui";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const QuizIntro = props => {
  const { handleSubmit } = props
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <Typography className="questionText" variant="h5">Let's get you <i>pear</i>-ed!</Typography>
          </Grid>
          <Grid item xs={12}>
            <Button color="primary" variant="contained" type="submit" className="next">Here We Go!</Button>
          </Grid>
        </Grid>
      </form >
    </div>
  )
}

export default reduxForm({
  form: 'wizard', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(QuizIntro)