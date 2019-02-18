import React from 'react'
import { reduxForm, formValueSelector } from 'redux-form'
import validate from './validate'
import { connect } from 'react-redux'
import { compose } from 'recompose';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import DateHelpers from '../helpers/Date'
import RenderRadioGroup from './RenderRadioGroup'

const renderError = ({ meta: { touched, error } }) =>
  touched && error ? <span>{error}</span> : false

let Quiz2 = props => {
  const { handleSubmit, previousPage, nextPage, firstName } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <Typography className="questionText" variant="h5">Hey {firstName}! Which outfit is more your style for work this {DateHelpers.getNearestDay()} morning? </Typography>
        </Grid>
        <Grid item xs={12}>
          <RenderRadioGroup questionName="dress" buttons={[
              {
                value: "0",
                name: "Casual"
              },
              {
                value: "1",
                name: "Business Casual"
              },
              {
                value: "2",
                name: "Formal"
              },
              {
                value: "3",
                name: "Uniform"
              }
            ]}/>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={16} justify="center">
            <Grid item>
              <Button variant="outlined" type="button" className="previous" onClick={previousPage}>
                Back
        </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" type="submit" onClick={nextPage} className="next">
                Next
        </Button>
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
const selector = formValueSelector('wizard') // <-- same as form name
Quiz2 = connect(state => {
  // can select values individually
  const firstName = selector(state, 'firstName');
  return {
    firstName
  }
})(Quiz2)

export default compose(
  reduxForm({
    form: 'wizard', //Form name is same
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    validate
  }))(Quiz2)