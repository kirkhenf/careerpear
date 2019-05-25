import React from 'react'
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

// Page imports
import Wizard from './Wizard'
import SignUpForm from '../Authentication/SignUp'
import './Quiz.css'
import DateHelpers from '../../helpers/Date'
import RenderRadios from './RenderRadios'
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

  createQuiz(brain) {
    var wizardArray = [];
    if (brain == 0) {
      for (let value of this.quizData.logical.questions) {
        wizardArray.push(<Wizard.Page key={value.key}>
          <RenderRadios
            questionText={"t"}
            questionName={"t"}
            options={value.options} />
        </Wizard.Page>);
      }
    }
    
    return wizardArray;
  }

  render() {
    const { isFetching } = this.props;
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
              <RenderRadios
                questionText={"Let's get you pear-ed! To start, which style best fits your personality?"}
                questionName="brain"
                options={[
                  {
                    value: "0",
                    label: "Logical"
                  },
                  {
                    value: "1",
                    label: "Creative"
                  }
                ]} />
            </Wizard.Page>
            {this.createQuiz(this.state.values.brain)}
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