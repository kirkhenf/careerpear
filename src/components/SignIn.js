import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as routes from '../constants/routes';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import MailOutline from '@material-ui/icons/MailOutline';
import LockOutline from '@material-ui/icons/LockOutline';
import "./SignIn.css"

const SignInPage = ({ history, firebase }) =>
  <div>
    <SignInForm history={history} firebase={firebase} />
  </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
    console.log(props);
  }

  click = () => {
    this.props.handleModalClick();
  }

  // onSubmit = (event) => {
  //   const {
  //     email,
  //     password,
  //   } = this.state;

  //   const {
  //     history,
  //   } = this.props;

  //   auth.doSignInWithEmailAndPassword(email, password)
  //     .then(() => {
  //       this.setState(() => ({ ...INITIAL_STATE }));
  //       history.push(routes.HOME);
  //     })
  //     .catch(error => {
  //       this.setState(byPropKey('error', error));
  //     });

  //   event.preventDefault();
  // }

  onSubmit = (event) => {
    const {
      firebase,
      history
    } = this.props;
    firebase.login({
      email: this.state.email,
      password: this.state.password
    }).then(() => {
      console.log("Logged in.");
      // history.push(routes.HOME);
    })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });
    event.preventDefault();
  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <TextField fullWidth label="Email" value={email} type="text" id="email" placeholder="" onChange={event => this.setState(byPropKey('email', event.target.value))}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <MailOutline />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Password" value={password} type="password" id="password" placeholder="" onChange={event => this.setState(byPropKey('password', event.target.value))}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <LockOutline />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            {/* <input
            value={email}
            onChange={event => this.setState(byPropKey('email', event.target.value))}
            type="text"
            placeholder="Email Address"
          />
          <input
            value={password}
            onChange={event => this.setState(byPropKey('password', event.target.value))}
            type="password"
            placeholder="Password"
          /> */}
            <Grid item xs={12}>
              <Button fullWidth color="primary" variant="contained" disabled={isInvalid} type="submit">Log In</Button>
            </Grid>
            {error && <p>{error.message}</p>}
          </Grid>
        </form>
      </div>
    );
  }
}

const SignInLink = ({optionalText, parentMethod}) =>
  <p className="signInLink" onClick={(e) => parentMethod('login')}>
    {optionalText}<Link to="#">Back to login</Link>
  </p>


export default compose(
  withRouter,
  firebaseConnect(), // withFirebase can also be used
  connect(({ firebase: { auth } }) => ({ auth }))
)(SignInForm)

export {
  SignInForm,
  SignInLink
};

