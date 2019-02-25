import React, { Component } from 'react';
import './Landing.css';
import Button from '@material-ui/core/Button'
import { Link, withRouter } from 'react-router-dom';
import * as routes from '../constants/routes';
import { compose } from 'redux'

const LandingPage = ({ history}) =>
  <LandingContent history={history} />

class LandingContent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="banner">
        <div className="banner__content"> 
          <h1>You're here. That means you're one step closer to a better career.</h1>
          <h3>Take our pear-ing assessment to see how we can help</h3>
          <Button size="large" component={Link} to={routes.QUIZ} color="secondary" variant="contained">Get Started</Button>
        </div>
      </div>
    );
  }
}

export default compose(
  withRouter)(LandingPage);