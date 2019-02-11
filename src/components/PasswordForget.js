import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./PasswordForget.css"
import { auth } from '../firebase';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import MailOutline from '@material-ui/icons/MailOutline';

const PasswordForgetPage = () =>
  <div>
    <h1>PasswordForget</h1>
    <PasswordForgetForm />
  </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email } = this.state;

    auth.doPasswordReset(email)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      error,
    } = this.state;

    const isInvalid = email === '';

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <Grid container spacing={16}>
            <Grid item xs={12} />
            <Grid item xs={12} className="test">
              <TextField 
                className="input"
                variant="outlined"
                label="Email"
                value={this.state.email}
                onChange={event => this.setState(byPropKey('email', event.target.value))}
                type="text"
                placeholder=""
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
              <Button fullWidth color="primary" variant="contained" disabled={isInvalid} type="submit">Reset My Password</Button>
            </Grid>
            {error && <p>{error.message}</p>}
          </Grid>
        </form>
      </div >
    );
  }
}

const PasswordForgetLink = ({ parentMethod }) =>
  <p onClick={(e) => parentMethod('pwForget')} className="pwForgetLink">
    <Link to="#">Forgot your password?</Link>
  </p>

export default PasswordForgetPage;

export {
  PasswordForgetForm,
  PasswordForgetLink,
};