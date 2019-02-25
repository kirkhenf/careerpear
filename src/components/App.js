import React from 'react';
import { firebase } from '../firebase';
import 'typeface-roboto'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as routes from '../constants/routes';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// File imports
import './App.css';
import Navigation from './Navigation';
import LandingPage from './Landing';
import SignUpPage from './Authentication/SignUp';
import SignInPage from './Authentication/SignIn';
import PasswordForgetPage from './Authentication/PasswordForget';
import HomePage from './Home';
import QuizPage from './Quiz';
import AccountPage from './Authentication/Account';
import SkillsPage from './Skills';
import withAuthentication from './Authentication/withAuthentication.js';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#297A6D',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#ffffff',
      contrastText: '#297A6D',
    }
  },
  status: {
    danger: 'orange',
  },
  typography: {
    "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
    "fontSize": 14,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500,
    useNextVariants: true,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920
    }
  } 
  // overrides: {
  //   MuiButton: { // Name of the component ⚛️ / style sheet
  //     text: { // Name of the rule
  //       color: 'blue', // Some CSS
  //     },
  //   },
  // },
});

const App = () =>
  <MuiThemeProvider theme={theme}>
    <Router>
      <div className="page">
        <Navigation />
        <div className="content">
          <Route exact path={routes.LANDING} component={() => <LandingPage />} />
          <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
          <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
          <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage />} />
          <Route exact path={routes.HOME} component={() => <HomePage />} />
          <Route exact path={routes.ACCOUNT} component={() => <AccountPage />} />
          <Route exact path={routes.QUIZ} component={() => <QuizPage />} />
          <Route exact path={routes.SKILLS} component={() => <SkillsPage />} />
        </div>
      </div>
    </Router>
  </MuiThemeProvider>

export default withAuthentication(App);