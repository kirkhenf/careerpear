import React from 'react';
import './App.css';
import { firebase } from '../firebase';
import 'typeface-roboto'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from './Navigation';
import LandingPage from './Landing';
import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import PasswordForgetPage from './PasswordForget';
import HomePage from './Home';
import QuizPage from './Quiz';
import AccountPage from './Account';
import SkillsPage from './Skills';
import withAuthentication from './withAuthentication.js';
import * as routes from '../constants/routes';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

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