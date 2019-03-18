import React from 'react'
import { withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux'
import LinearProgress from '@material-ui/core/LinearProgress'

// Page imports
import Wizard from './Wizard'
import SignUpForm from '../Authentication/SignUp'
import './Quiz.css'
import DateHelpers from '../../helpers/Date'
import { addQuizResults } from '../../actions';
import QuizIntro from './QuestionTypes/QuizIntro';
import ShortForm from './QuestionTypes/ShortForm';
import MultipleChoice from './QuestionTypes/MultipleChoice';

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: '',
      pageProgress: 0,
      isFetching: false,
    }
  }

  addSomething(valuesFromWizard) {
    this.setState({ values: valuesFromWizard });
  }

  getPageProgress(pageProgress) {
    this.setState({ pageProgress: pageProgress });
  }

  onSubmit = (values) => {
    const { addQuizResults, history } = this.props;
    addQuizResults(values, history);
  }

  byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
  });

  render() {
    const { isFetching } = this.props;

    const FirstNameShortForm = {
      Question: "We'll start slow. What's your name?",
      Placeholder: "First Name",
      FieldName: "firstName"
    };

    const DressCodeMultipleChoice = {
      Question: "Hey " + this.state.values.firstName + '! Which outfit is more your style for work this ' + DateHelpers.getNearestDay() + ' morning?',
      QuestionName: "dress",
      Options: 
        [
          {
            value: "0",
            label: "Casual"
          },
          {
            value: "1",
            label: "Business Casual"
          },
          {
            value: "2",
            label: "Formal"
          },
          {
            value: "3",
            label: "Uniform"
          }
        ]
    };

    return (
      <div className="bodyContent">
        <div className="quizContent">
          <Wizard
            onSubmit={this.onSubmit}
            addSomething={(values => this.addSomething(values, ))}
            getPageProgress={(pageProgress => this.getPageProgress(pageProgress))}
            isFetching={isFetching}
          >
            <Wizard.Page>
              <QuizIntro></QuizIntro>
            </Wizard.Page>
            <Wizard.Page>
              <ShortForm {...FirstNameShortForm}></ShortForm>
            </Wizard.Page>
            <Wizard.Page>
              <MultipleChoice {...DressCodeMultipleChoice}></MultipleChoice>
            </Wizard.Page>
            <Wizard.Page
              validate={values => {
                const errors = {};
                if (!values.firstName) {
                  errors.firstName = "Required";
                }
                if (!values.lastName) {
                  errors.lastName = "Required";
                }
                if (!values.email) {
                  errors.email = "Required";
                } else if (!values.email.match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)) {
                  errors.email = "Please enter a valid e-mail adresssss"
                }
                if (!values.passwordOne) {
                  errors.passwordOne = "Required";
                }
                if (values.passwordOne !== values.passwordTwo) {
                  errors.passwordTwo = "Your passwords must match";
                }
                return errors;
              }}>
              <Typography variant="h5">You did it!</Typography>
              <SignUpForm
                firstName={this.state.values.firstName} />
            </Wizard.Page>
          </Wizard >
        </div>
        <LinearProgress className="progressBar" variant="determinate" value={this.state.pageProgress} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.quiz.isFetching,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addQuizResults: (quizResults, history) => dispatch(addQuizResults(quizResults, history))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  firebaseConnect())(Quiz)