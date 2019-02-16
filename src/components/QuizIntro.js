import React from 'react'
import { reduxForm } from 'redux-form'
import validate from './validate'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

const QuizIntro = props => {
  const { handleSubmit } = props
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <Typography className="questionText" variant="h5">Intro text!</Typography>
        </Grid>
        <Grid item xs={12}>
          <Button color="primary" variant="contained" type="submit" className="next">Here We Go!</Button>
        </Grid>
      </Grid>
    </form >
  )
}

export default reduxForm({
  form: 'wizard', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(QuizIntro)