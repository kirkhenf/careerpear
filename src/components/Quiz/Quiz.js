import React, { Suspense } from 'react'
import Grow from '@material-ui/core/Grow'
import Grid from '@material-ui/core/Grid'
import { withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography'
import { Field } from 'react-final-form'
import { TextField } from "final-form-material-ui";
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux'
import LinearProgress from '@material-ui/core/LinearProgress'
import useFetch from 'fetch-suspense';
import CircularProgress from '@material-ui/core/CircularProgress';

// Page imports
import Wizard from './Wizard'
import SignUpForm from '../Authentication/SignUp'
import './Quiz.css'
import DateHelpers from '../../helpers/Date'
import { NormalRadios, WizardRadios } from './RenderRadios'
import { addQuizResults } from '../../actions';

const required = value => (value ? undefined : 'Required')

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: '',
      pageProgress: 0,
      isFetching: false,
    }
  }

  handleChange = (event) => {
    var value = event.target.value;
    this.setState(state => ({
      brain: value
    }))
  }

  reset = () => {
    this.setState(state => ({
      brain: undefined
    }))
  }

  getSubmissionPage() {
    return (
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
          return errors;
        }}>
        <Typography variant="h5">You did it!</Typography>
        <SignUpForm
          firstName={this.state.values.firstName} />
      </Wizard.Page>
    )
  }

  QuizQuestions = () => {
    const data = useFetch('https://us-central1-careerpear-10c55.cloudfunctions.net/getCreativeQuiz', { method: 'GET' });
    var brain = this.state.brain;
    var wizardArray = [];
    var options = [];
    const { isFetching } = this.props;
    if (brain == 0) {
      return (
        <Wizard
          onSubmit={this.onSubmit}
          addSomething={(values => this.addSomething(values, ))}
          getPageProgress={(pageProgress => this.getPageProgress(pageProgress))}
          isFetching={isFetching}
          reset={this.reset}
        >
          {this.quizData.logical.questions.map(value => (
            <Wizard.Page key={value.key}>
              <WizardRadios
                questionText={value.questionText}
                questionName={value.questionName}
                options={value.options} />
            </Wizard.Page>))}
          {this.getSubmissionPage()}
        </Wizard>
      )
    } else if (brain == 1)
      return (
        <Wizard
          onSubmit={this.onSubmit}
          addSomething={(values => this.addSomething(values, ))}
          getPageProgress={(pageProgress => this.getPageProgress(pageProgress))}
          isFetching={isFetching}
          reset={this.reset}
        >
          {data.map(value => (
            options = [],
            value.choices.forEach(choice => (
              options.push(
                {
                  label: choice.personaDebug,
                  value: choice.personaId
                }
              )
            )),
            <Wizard.Page key={value.questionId}>
              <WizardRadios
                questionText={value.question}
                questionName={value.questionId}
                options={options}
              />
            </Wizard.Page>
          ))}
          {this.getSubmissionPage()}
        </Wizard>
      )
    return (wizardArray);
  }

  quizData = require('../../config/questions.json');

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
    return (
      <div className="bodyContent">
        <div className="quizContent">
          {!this.state.brain && <NormalRadios
            questionText={"Let's get you pear-ed! To start, which style best fits your personality?"}
            questionName="brain"
            handleChange={this.handleChange}
            options={[
              {
                value: "0",
                label: "Logical"
              },
              {
                value: "1",
                label: "Creative"
              }
            ]} />}
          {this.state.brain && <Suspense fallback={<CircularProgress />}>
            <this.QuizQuestions />
          </Suspense>}
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