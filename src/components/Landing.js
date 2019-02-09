import React from 'react';
import './Landing.css';
import Button from '@material-ui/core/Button'

const LandingPage = () =>
  <div className="banner">
    <div className="banner__content">
      <h1 className="header">You're here. That means you're one step closer to a better career.</h1>
      <Button size="large" variant="contained">Get Started</Button>
    </div>
  </div>

export default LandingPage;