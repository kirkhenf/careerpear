import React from 'react'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import validate from './validate'
import renderField from './renderField'
import { connect } from 'react-redux'
import { compose } from 'recompose';

const renderError = ({ meta: { touched, error } }) =>
  touched && error ? <span>{error}</span> : false

let Quiz2 = props => {
  const { handleSubmit, previousPage, firstName } = props;
  return (
    <form onSubmit={handleSubmit}>
    <p>Hey {firstName}!</p>
      <Field name="email" type="email" component={renderField} label="Email" />
      <div>
        <label>Sex</label>
        <div>
          <label>
            <Field
              name="sex"
              component="input"
              type="radio"
              value="male"
            />{' '}
            Male
          </label>
          <label>
            <Field
              name="sex"
              component="input"
              type="radio"
              value="female"
            />{' '}
            Female
          </label>
          <Field name="sex" component={renderError} />
        </div>
      </div>
      <div>
        <button type="button" className="previous" onClick={previousPage}>
          Previous
        </button>
        <button type="submit" className="next">
          Next
        </button>
      </div>
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

Quiz2 = connect(
  state => ({
    values: {
      family: state.form.wizard.values
    }
  })
)(Quiz2)

export default
  reduxForm({
    form: 'wizard', //Form name is same
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    validate
  })(Quiz2)