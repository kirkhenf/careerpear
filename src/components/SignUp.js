import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'redux'
import { connect } from 'react-redux'
import * as routes from '../constants/routes';
import { firebaseConnect } from 'react-redux-firebase';
import Button from '@material-ui/core/Button'
import InputAdornment from '@material-ui/core/InputAdornment';
import PersonOutline from '@material-ui/icons/PersonOutline';
import MailOutline from '@material-ui/icons/MailOutline';
import LockOpenOutlined from '@material-ui/icons/LockOpenOutlined';
import Grid from '@material-ui/core/Grid';
import { Field } from 'react-final-form'
import { TextField } from "final-form-material-ui";
import "./SignUp.css"

// <Field
//   name="firstName"
//   type="text"
//   component={TextField}
//   margin="normal"
//   fullWidth
//   variant="outlined"
//   validate={required}
// />

const SignUpPage = ({ history, firebase, firstName }) =>
  <div>
    <h1>SignUp</h1>
    <SignUpForm history={history} firstName={firstName} firebase={firebase} />
  </div>

const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  email: '',
  passwordOne: '',
  error: null,
};

const onSubmit = (event) => {
  event.preventDefault();
  const {
    firstName,
    lastName,
    email,
    passwordOne,
  } = this.state;

  const {
    firebase,
    history
  } = this.props;

  // createNewUser = ({ email, password, firstName, lastName }) => {
  firebase.createUser({
    email: email,
    password: passwordOne
  }, {
      email: email,
      firstName: firstName,
      lastName: lastName,
      role: 'user'
    })
    .then((data) => {
    }).catch((error) => {
      this.setState(byPropKey('error', error));
    });
  // }

  // auth.doCreateUserWithEmailAndPassword(email, passwordOne)
  //   .then(authUser => {
  //     // Create a user in your own accessible Firebase Database too
  //     db.doCreateUser(authUser.user.uid, firstName, lastName, email)
  //       .then(() => {
  //         this.setState(() => ({ ...INITIAL_STATE }));
  //         history.push(routes.HOME);
  //       })
  //       .catch(error => {
  //         this.setState(byPropKey('error', error));
  //       });
  //   })
  //   .catch(error => {
  //     this.setState(byPropKey('error', error));
  //   });
}

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const required = value => (value ? undefined : 'Required')

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.state.firstName = props.firstName;
  }

  render() {
    const {
      firstName,
      lastName,
      email,
      passwordOne,
      error,
    } = this.state;

    const isInvalid =
      passwordOne === '' ||
      email === '' ||
      firstName === '' ||
      lastName === '';


    return (
      <div>
        {/* <form onSubmit={this.onSubmit}> */}
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <Field
              variant="outlined"
              className="input"
              label="First name"
              name="firstName"
              type="text"
              id="firstName"
              placeholder=""
              component={TextField}
              validate={required}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <PersonOutline color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              variant="outlined"
              className="input"
              label="Last name"
              type="text"
              id="lastName"
              name="lastName"
              component={TextField}
              validate={required}
              placeholder=""
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <PersonOutline color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              variant="outlined"
              className="input"
              name="email"
              label="Email"
              type="text"
              id="email"
              component={TextField}
              validate={required}
              placeholder=""
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <MailOutline color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              variant="outlined"
              className="input"
              label="Password"
              name="passwordOne"
              component={TextField}
              validate={required}
              type="password"
              id="passwordOne"
              placeholder=""
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <LockOpenOutlined color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

const SignUpButton = () =>
  <Grid className="signUpButton" container spacing={24}>
    <Grid item xs={12}>
      <Button fullWidth color="primary" variant="contained" type="submit">
        Sign Up
            </Button>
    </Grid>
  </Grid>


const SignUpLink = ({ parentMethod }) =>
  <p className="signUpLink" onClick={(e) => parentMethod('signUp')}>
    Don't have an account?
    {' '}
    <Link to="#">Sign up</Link>
  </p>

export default compose(
  withRouter,
  firebaseConnect(),
  connect((state) => ({
    auth: state.firebase.auth,
    profile: state.firebase.profile
  })))(SignUpPage);

export {
  SignUpForm,
  SignUpLink,
  SignUpButton
};