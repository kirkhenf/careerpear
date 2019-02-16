import React from 'react'
import { reduxForm } from 'redux-form'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import SignUpForm from './SignUp'

const QuizIntro = props => {
    const { handleSubmit } = props
    return (
        <div>
            <Typography variant="h5" color="primary">You made it!</Typography>
            <SignUpForm />
        </div>
    )
}

export default reduxForm({
    form: 'wizard', // <------ same form name
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(QuizIntro)