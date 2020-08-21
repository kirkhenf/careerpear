import React, { Component } from 'react';
import './Landing.css';
import Button from '@material-ui/core/Button'
import { Link, withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import * as routes from '../constants/routes';
import Hidden from '@material-ui/core/Hidden';
import Slide from '@material-ui/core/Slide';
import { compose } from 'redux'
import FullScreenDialog from './FullScreenDialog';

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
      <div className="background">
        <Hidden xsDown>
          <AppBar onMouseOver={() => (document.getElementById('pearLogo').src = require('../assets/careerpear-green-banner-fruit.png'))}
            onMouseOut={() => (document.getElementById('pearLogo').src = require('../assets/careerpear-white-banner-fruit.png'))} className="appbar" position="static">
            <Toolbar className="navContainer">
              <div className="leftNav" />
              <div className="midNav">
                <img id='pearLogo' className='pearLogo' alt="careerpear_logo" src={require('../assets/careerpear-white-banner-fruit.png')} />
              </div>
              <div className="rightNav">
                <Button>Login</Button>
              </div>
            </Toolbar>
          </AppBar>
        </Hidden>
        <Hidden smUp>
          <AppBar className="appbarsmall" position="static">
            <Toolbar className="navContainer">
              <div className="leftNav">
                <FullScreenDialog />
              </div>
              <div className="midNav">
                <img id='pearLogo' className='pearLogo' alt="careerpear_logo" src={require('../assets/careerpear-white-fruit.png')} />
              </div>
              <div className="rightNav">
                <Button>Login</Button>
              </div>
            </Toolbar>
          </AppBar>
        </Hidden>
        <div className="banner_content">
          <h1>You're here. That means you're one step closer to a better career.</h1>
          <h3>Take our <i>pear-ing</i> assessment to see how we can help.</h3>
          <Button className="quizStart" size="large" component={Link} to={routes.QUIZ} color="secondary" variant="contained">Take the quiz</Button>
        </div>
      </div>
    );
  }
}

export default compose(
  withRouter)(LandingPage);