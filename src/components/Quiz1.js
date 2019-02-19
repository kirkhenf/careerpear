import React from 'react'
import { reduxForm } from 'redux-form'
import validate from './validate'
import Grow from '@material-ui/core/Grow'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { Field } from 'react-final-form'
import { TextField } from "final-form-material-ui";
import Wizard from './Wizard'
import RenderRadios from './RenderRadios'

const onSubmit = async values => {
  await sleep(300)
  window.alert(JSON.stringify(values, 0, 2))
}

const required = value => (value ? undefined : 'Required')

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const Quiz1 = props => {
  return (
    <Wizard
      // initialValues={{ employed: true, stooge: 'larry' }}
      onSubmit={onSubmit}
    >
      <Wizard.Page>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <Typography className="questionText" variant="h5">Let's get you <i>pear</i>-ed!</Typography>
          </Grid>
        </Grid>
      </Wizard.Page>
      <Wizard.Page>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <Typography className="questionText" variant="h5">We'll start slow. What's your name?</Typography>
          </Grid>
          <Grid item xs={12}>
            <Grow timeout={500} in={true}>
              <Field
                name="firstName"
                type="text"
                component={TextField}
                margin="normal"
                fullWidth
                variant="outlined"
                validate={required}
              />
            </Grow>
          </Grid>
        </Grid>
      </Wizard.Page>
      <Wizard.Page>
        <RenderRadios questionText="test" questionName="dress" options={[
          {
            value: "0",
            label: "Casual"
          },
          {
            value: "1",
            label: "Business Casual"
          },
          {
            value: "2",
            label: "Formal"
          },
          {
            value: "3",
            label: "Uniform"
          }
        ]} />
      </Wizard.Page >
    </Wizard >
  )
}

export default reduxForm({
  form: 'wizard', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(Quiz1)