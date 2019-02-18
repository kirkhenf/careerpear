import React from 'react'
import { reduxForm } from 'redux-form'
import validate from './validate'
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grow from '@material-ui/core/Grow'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { Form, Field } from 'react-final-form'
import { Radio, TextField } from "final-form-material-ui";
import Wizard from './Wizard'

const onSubmit = async values => {
  await sleep(300)
  window.alert(JSON.stringify(values, 0, 2))
}

const required = value => (value ? undefined : 'Required')

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const Quiz1 = props => {
  return (
    // <form className="form" onSubmit={handleSubmit}>
    //   <Grid container spacing={16}>
    //     <Grid item xs={12}>
    //       <Typography className="questionText" variant="h5">We'll start slow. What's your name?</Typography>
    //     </Grid>
    //     <Grid item xs={12}>
    //       <Grow timeout={500} in={true}>
    //         <Field
    //           name="firstName"
    //           type="text"
    //           variant="outlined"
    //           component={renderTextField}
    //         // placeholder="What's your name?"
    //         />
    //       </Grow>
    //     </Grid>
    //     <Grid item xs={12}>
    //       <div>
    //         <Button variant="contained" color="primary" type="submit" className="next">
    //           Next
    //     </Button>
    //       </div>
    //     </Grid>
    //   </Grid>
    // </form>
    <Wizard
      // initialValues={{ employed: true, stooge: 'larry' }}
      onSubmit={onSubmit}
    >
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
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <Typography className="questionText" variant="h5">We'll start slow. What's your name?</Typography>
          </Grid>
          <Grid item xs={12}>
            <Grow timeout={500} in={true}>
              <FormControl component="fieldset">
                <RadioGroup row>
                  <FormControlLabel
                    label="Casual"
                    control={
                      <Field
                        name="dress"
                        color="primary"
                        component={Radio}
                        type="radio"
                        value="0"
                      />
                    }
                  />
                  <FormControlLabel
                    label="Business Casual"
                    control={
                      <Field
                        name="dress"
                        color="primary"
                        component={Radio}
                        type="radio"
                        value="1"
                      />
                    }
                  />
                  <FormControlLabel
                    label="Formal"
                    control={
                      <Field
                        name="dress"
                        color="primary"
                        component={Radio}
                        type="radio"
                        value="2"
                      />
                    }
                  />
                  <FormControlLabel
                    label="Uniform"
                    control={
                      <Field
                        name="dress"
                        color="primary"
                        component={Radio}
                        type="radio"
                        value="3"
                      />
                    }
                  />
                </RadioGroup>
              </FormControl>
            </Grow>
          </Grid>
        </Grid>
      </Wizard.Page>
    </Wizard>
  )
}

export default reduxForm({
  form: 'wizard', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(Quiz1)