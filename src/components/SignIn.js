import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { SignUpLink } from './SignUp';
import { PasswordForgetLink } from './PasswordForget';
import { auth } from '../firebase';
import * as routes from '../constants/routes';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const SignInPage = ({ history, firebase }) =>
  <div>
    <h1>SignIn</h1>
    <SignInForm history={history} firebase={firebase} />
    <PasswordForgetLink />
    <SignUpLink />
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
      history.push(routes.HOME);
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
          <div>
            <TextField label="Email" value={email} type="text" id="email" placeholder="" onChange={event => this.setState(byPropKey('email', event.target.value))} />
          </div>
          <div>
            <TextField label="Password" value={password} type="password" id="password" placeholder="" onChange={event => this.setState(byPropKey('password', event.target.value))} />
          </div>
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
          <Button disabled={isInvalid} type="submit">
            Sign In
        </Button>

          {error && <p>{error.message}</p>}
        </form>
      </div>
    );
  }
}

// export default withRouter(SignInPage);

export default compose(
  withRouter,
  firebaseConnect(), // withFirebase can also be used
  connect(({ firebase: { auth } }) => ({ auth }))
)(SignInPage)

export {
  SignInForm,
};