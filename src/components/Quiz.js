import React from 'react'
import Grow from '@material-ui/core/Grow'
import Grid from '@material-ui/core/Grid'
import { withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography'
import { Field } from 'react-final-form'
import { TextField } from "final-form-material-ui";
import Wizard from './Wizard'
import RenderRadios from './RenderRadios'
import DateHelpers from '../helpers/Date'
import SignUpForm from './SignUp'
import { firebaseConnect } from 'react-redux-firebase';
import './Quiz.css'
import * as routes from '../constants/routes';
import { compose } from 'redux'
import LinearProgress from '@material-ui/core/LinearProgress'

const required = value => (value ? undefined : 'Required')

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: '',
      pageProgress: 0
    }
  }

  addSomething(valuesFromWizard, pages, currentPage) {
    this.setState({ values: valuesFromWizard });
  }

  getPageProgress(pageProgress) {
    this.setState({ pageProgress: pageProgress });
  }

  onSubmit = values => {
    const { firebase, history } = this.props;
    firebase.createUser({
      email: values.email,
      password: values.passwordOne
    }, {
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        role: 'user'
      })
      .then((data) => {
        console.log(data);
        history.push(routes.HOME);
      }).catch((error) => {
        console.log(error);
      });
  }

  byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
  });

  render() {
    return (
      <div className="bodyContent">
        <div className="quizContent">
          <Wizard
            onSubmit={this.onSubmit}
            addSomething={(values => this.addSomething(values, ))}
            getPageProgress={(pageProgress => this.getPageProgress(pageProgress))}
          >
            <Wizard.Page>
              <Grid container spacing={16}>
                <Grid item xs={12}>
                  <Typography className="questionText" variant="h5">Let's get you <i>pear</i>-ed!</Typography>
                </Grid>
              </Grid>
            </Wizard.Page>
            <Wizard.Page>
              <Grid container spacing={16}>
                <Grid item xs={12}>
                  <Typography className="questionText" variant="h5">We'll start slow. What's your name?</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Grow timeout={500} in={true}>
                    <Field
                      name="firstName"
                      type="text"
                      component={TextField}
                      margin="normal"
                      fullWidth
                      variant="outlined"
                      validate={required}
                    />
                  </Grow>
                </Grid>
              </Grid>
            </Wizard.Page>
            <Wizard.Page>
              <RenderRadios
                questionText={'Hey ' + this.state.values.firstName + '! Which outfit is more your style for work this ' + DateHelpers.getNearestDay() + ' morning?'}
                // questionText="test"
                questionName="dress"
                options={[
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
                ]} />
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
        <LinearProgress className="progressBar" variant="determinate" value={this.state.pageProgress}/>
      </div>
    )
  }
}

export default compose(
  withRouter,
  firebaseConnect())(Quiz)