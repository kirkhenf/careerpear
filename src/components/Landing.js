import React, { Component } from 'react';
import './Landing.css';
import Button from '@material-ui/core/Button'
import { Link, withRouter } from 'react-router-dom';
import * as routes from '../constants/routes';
import { addQuizResults } from '../actions';
import { compose } from 'redux'
import { connect } from "react-redux";
import { withFirestore } from 'react-redux-firebase';

const LandingPage = ({ history, addQuizResults, firestore }) =>
  <LandingContent history={history} firestore={firestore} addQuizResults={addQuizResults}/>

class LandingContent extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    const { addQuizResults } = this.props;
    console.log(addQuizResults);
    addQuizResults();
  }

  goToQuiz = (e) => {
    this.props.history.push(routes.QUIZ);
    e.preventDefault();
  }

  render() {
    return (
      <div className="banner">
        <div className="banner__content">
          <h1>You're here. That means you're one step closer to a better career.</h1>
          <h3>Take our pear-ing assessment to see how we can help</h3>
          <Button size="large" onClick={(e) => this.goToQuiz(e)} color="secondary" variant="contained">Get Started</Button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
      bungo: state.bungoTokenReducer
  }
}

function mapDispatchToProps(dispatch) {
  return {
      addQuizResults: () => dispatch(addQuizResults({test: 'test'})),
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFirestore,
  withRouter)(LandingPage);