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
import LockOutline from '@material-ui/icons/LockOutline';
import "./SignUp.css"

const SignUpPage = ({ history, firebase }) =>
  <div>
    <h1>SignUp</h1>
    <SignUpForm history={history} firebase={firebase} />
  </div>

const INITIAL_STATE = {
  first_name: '',
  last_name: '',
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
  }

  onSubmit = (event) => {
    event.preventDefault();
    const {
      first_name,
      last_name,
      email,
      passwordOne,
    } = this.state;

    const {
      firebase,
      history
    } = this.props;

    // createNewUser = ({ email, password, first_name, last_name }) => {
    firebase.createUser({
      email: email,
      password: passwordOne
    }, {
        email: email,
        first_name: first_name,
        last_name: last_name,
        role: 'user'
      })
      .then((data) => {
        history.push(routes.HOME);
      });
    // }

    // auth.doCreateUserWithEmailAndPassword(email, passwordOne)
    //   .then(authUser => {
    //     // Create a user in your own accessible Firebase Database too
    //     db.doCreateUser(authUser.user.uid, first_name, last_name, email)
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
    event.preventDefault();
  }

  render() {
    const {
      first_name,
      last_name,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      first_name === '' ||
      last_name === '';


    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div>
            <TextField label="First Name" value={first_name} type="text" id="first_name" placeholder="" onChange={event => this.setState(byPropKey('first_name', event.target.value))}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <PersonOutline />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div>
            <TextField label="Last Name" value={last_name} type="text" id="last_name" placeholder="" onChange={event => this.setState(byPropKey('last_name', event.target.value))}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <PersonOutline />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div>
            <TextField label="Email" value={email} type="text" id="email" placeholder="" onChange={event => this.setState(byPropKey('email', event.target.value))}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <MailOutline />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div>
            <TextField label="Password" value={passwordOne} type="password" id="passwordOne" placeholder="" onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <LockOutline />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div>
            <TextField label="Confirm Password" value={passwordTwo} type="password" id="passwordTwo" placeholder="" onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <LockOutline />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          {/* <input
          value={first_name}
          onChange={event => this.setState(byPropKey('first_name', event.target.value))}
          type="text"
          placeholder="First Name"
        />
        <input
          value={last_name}
          onChange={event => this.setState(byPropKey('last_name', event.target.value))}
          type="text"
          placeholder="Last Name"
        />
        <input
          value={email}
          onChange={event => this.setState(byPropKey('email', event.target.value))}
          type="text"
          placeholder="Email Address"
        />
        <input
          value={passwordOne}
          onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
          type="password"
          placeholder="Password"
        />
        <input
          value={passwordTwo}
          onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
          type="password"
          placeholder="Confirm Password"
        /> */}
          <Button disabled={isInvalid} type="submit">
            Sign Up
            </Button>

          {error && <p>{error.message}</p>}
        </form>
      </div>
    );
  }
}

const SignUpLink = () =>
  <p className="signUpLink">
    Don't have an account?
    {' '}
    <Link to={routes.SIGN_UP}>Sign Up</Link>
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
};