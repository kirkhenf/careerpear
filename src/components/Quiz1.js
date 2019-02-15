import React from 'react'
import { Field, reduxForm } from 'redux-form'
import validate from './validate'
import renderField from './renderField'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grow from '@material-ui/core/Grow'
import Grid from '@material-ui/core/Grid'

const Quiz1 = props => {
  const { handleSubmit } = props
  return (
    <form className="form" onSubmit={handleSubmit}>
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <Grow timeout={500} in={true}>
            <Field
              name="firstName"
              type="text"
              variant="outlined"
              component={renderField}
              label="First Name"
            />
          </Grow>
        </Grid>
        <Grid item xs={12}>
          <div>
            <Button type="submit" className="next">
              Next
        </Button>
          </div>
        </Grid>
      </Grid>
    </form>
  )
}

export default reduxForm({
  form: 'wizard', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(Quiz1)