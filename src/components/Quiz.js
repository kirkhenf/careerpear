import React, { Component } from 'react';
import QuizIntro from './QuizIntro';
import Quiz1 from './Quiz1';
import Quiz2 from './Quiz2';
import withAuthorization from './withAuthorization';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import * as routes from '../constants/routes';
import Button from '@material-ui/core/Button'
import { withFirebase } from 'react-redux-firebase'

class QuizPage extends Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.state = {
      page: 1
    }
  }

  nextPage() {
    this.setState({ page: this.state.page + 1 })
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 })
  }

  sendHome = () => {
    console.log(this.props);
    this.props.history.push(routes.HOME);
  }

  testPush = () => {
    const firebase = this.props.firebase;
    console.log("Pushed");
    console.log(this.props);
    firebase.push('todos', this.props.authUser.email);
    console.log(this.props.authUser)
  }

  render() {
    // const { onSubmit } = this.props
    const { page } = this.state
    return (
      <div>
        <Button onClick={this.testPush}>Send Data</Button>
        {page === 1 && <QuizIntro onSubmit={this.nextPage} />}
        {page === 2 && <Quiz1 onSubmit={this.nextPage} />}
        {page === 3 && (
          <Quiz2
            previousPage={this.previousPage}
            onSubmit={this.sendHome}
          />
        )}
      </div>
    )
  }

}

QuizPage.propTypes = {
  // onSubmit: PropTypes.func.isRequired
}


// const QuizPage = ({ history }) =>
//   <div>
//     <h1>Quiz</h1>
//     {/* <SignUpForm history={history} /> */}
//   </div>

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

const authCondition = (authUser) => !!authUser;

export default compose(
  withAuthorization(authCondition),
  withFirebase,
  withRouter,
  connect(mapStateToProps)
)(QuizPage);