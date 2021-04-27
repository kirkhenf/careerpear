import React, { Component } from 'react';
import './Landing.css';
import Button from '@material-ui/core/Button'
import { Link, withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import * as routes from '../constants/routes';
import Slide from '@material-ui/core/Slide';
import { compose } from 'redux'
import Navigation from './Navigation';
import InstagramIcon from '@material-ui/icons/Instagram';

const LandingPage = ({ history }) =>
  <LandingContent history={history} />

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class LandingContent extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      // <div className="background">
      // <Navigation />
      //   <div className="banner_content">
      //     <h1>You're here. That means you're one step closer to a better career.</h1>
      //     <h3>Take our <i>pear-ing</i> assessment to see how we can help.</h3>
      //     <Button className="quizStart" size="large" component={Link} to={routes.QUIZ} color="secondary" variant="contained">Take the quiz</Button>
      //   </div>
      // </div>
      <div className="background">
        <div className="banner_content">
          <img height="100" src={require('../assets/careerpear-green-fruit.png')} />
          <h1 className="subtext">Launching Summer 2021</h1>
        </div>
        <div className="footer">
          <a href="mailto:contact@careerpear.com" className="subtext">Get in Touch</a> <a className="divider">|</a> <a target="_" href="https://www.instagram.com/careerpear/"><InstagramIcon className="instaIcon" className="subtext" /></a>
        </div>
      </div>
    );
  }
}

export default compose(
  withRouter)(LandingPage);