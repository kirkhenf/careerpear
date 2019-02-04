import React from 'react'
import { Field, reduxForm } from 'redux-form'
import validate from './validate'
import Button from '@material-ui/core/Button'

const QuizIntro = props => {
  const { handleSubmit } = props
  return (
    <form onSubmit={handleSubmit}>
      This is the quiz intro please click button.
      <div>
        <Button variant="contained" type="submit" className="next">
          Get Started
        </Button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'wizard', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(QuizIntro)