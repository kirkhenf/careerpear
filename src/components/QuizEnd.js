import React from 'react'
import { reduxForm, getFormValues } from 'redux-form'
import Typography from '@material-ui/core/Typography'
import SignUpForm from './SignUp'
import { connect } from 'react-redux';

let QuizEnd = props => {
    const { values } = props;
    console.log(values);
    return (
        <div>
            <Typography variant="h6"><pre>{JSON.stringify(values, null, 2) }</pre></Typography>
            {/* <SignUpForm /> */}
        </div>
    )
}

QuizEnd = connect(state => {
    // can select values individually
    const values = getFormValues('wizard')(state);
    return {
        values
    }
})(QuizEnd)

export default reduxForm({
    form: 'wizard', // <------ same form name
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(QuizEnd)