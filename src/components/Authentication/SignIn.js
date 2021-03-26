import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/core/styles';

// Page imports
import "./SignIn.css"

const SignInPage = ({ history, firebase }) =>
  <div>
    <SignInForm history={history} firebase={firebase} />
  </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const styles = {
  cssOutlinedInput: {
    
  },
  test: {
    color: 'pink !important',
    '& label': {
      color: 'white',
      '& .shrink' : {
        color: 'pink !important'
      }
    },
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'beige'
    }
  }
};

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

  click = () => {
    this.props.handleModalClick();
  }

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

    const { classes } = this.props;
    console.log(classes);

    const isInvalid =
      password === '' ||
      email === '';

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <Grid container spacing={16}>
            <Grid item xs={12}>
              <TextField className="input" color="primary" variant="outlined" label="Email" value={email} type="text" id="email" placeholder="" onChange={event => this.setState(byPropKey('email', event.target.value))}
                InputProps={{
                  classes: {
                    root: classes.test,
                    focused: classes.cssFocused,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField className="input" color="secondary" variant="outlined" label="Password" value={password} type="password" id="password" placeholder="" onChange={event => this.setState(byPropKey('password', event.target.value))} />
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth color="secondary" variant="contained" disabled={isInvalid} type="submit">Log In</Button>
            </Grid>
            {error && <p>{error.message}</p>}
          </Grid>
        </form>
      </div>
    );
  }
}

const SignInLink = ({ optionalText, parentMethod }) =>
  <p className="signInLink" onClick={(e) => parentMethod('login')}>
    {optionalText}<Link to="#">Back to login</Link>
  </p>

export default compose(
  withStyles(styles),
  withRouter,
  firebaseConnect(), // withFirebase can also be used
  connect(({ firebase: { auth } }) => ({ auth }))
)(SignInForm)

const SignInForms = withStyles(styles)(SignInForm);

export {
  SignInForm,
  SignInForms,
  SignInLink
};

