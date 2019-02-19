import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'redux'
import { connect } from 'react-redux'
import * as routes from '../constants/routes';
import { firebaseConnect } from 'react-redux-firebase';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import InputAdornment from '@material-ui/core/InputAdornment';
import PersonOutline from '@material-ui/icons/PersonOutline';
import MailOutline from '@material-ui/icons/MailOutline';
import LockOpenOutlined from '@material-ui/icons/LockOpenOutlined';
import Grid from '@material-ui/core/Grid';
import "./SignUp.css"

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
  passwordTwo: '',
  error: null,
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.state.firstName = props.firstName;
  }

  onSubmit = (event) => {
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

  render() {
    const {
      firstName,
      lastName,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      firstName === '' ||
      lastName === '';


    return (
      <div>
        {/* <form onSubmit={this.onSubmit}> */}
          <Grid container spacing={16}>
            <Grid item xs={12}>
              <TextField variant="outlined" className="input" label="First name" value={firstName} type="text" id="firstName" placeholder="" onChange={event => this.setState(byPropKey('firstName', event.target.value))}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <PersonOutline color="primary"/>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField variant="outlined" className="input" label="Last name" value={lastName} type="text" id="lastName" placeholder="" onChange={event => this.setState(byPropKey('lastName', event.target.value))}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <PersonOutline color="primary"/>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField variant="outlined" className="input" label="Email" value={email} type="text" id="email" placeholder="" onChange={event => this.setState(byPropKey('email', event.target.value))}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <MailOutline color="primary"/>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField variant="outlined" className="input" label="Password" value={passwordOne} type="password" id="passwordOne" placeholder="" onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <LockOpenOutlined color="primary"/>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField variant="outlined" className="input" label="Confirm password" value={passwordTwo} type="password" id="passwordTwo" placeholder="" onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <LockOpenOutlined color="primary"/>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth color="primary" variant="contained" disabled={isInvalid} type="submit">
                Sign Up
            </Button>
            </Grid>
            {error && <p>{error.message}</p>}
          </Grid>
        {/* </form> */}
      </div>
    );
  }
}

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
  SignUpLink
};