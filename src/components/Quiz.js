import React from 'react'
import Grow from '@material-ui/core/Grow'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { Field } from 'react-final-form'
import { TextField } from "final-form-material-ui";
import Wizard from './Wizard'
import RenderRadios from './RenderRadios'
import DateHelpers from '../helpers/Date'
import SignUpForm from './SignUp'
import { firebaseConnect } from 'react-redux-firebase';
import './Quiz.css'

const required = value => (value ? undefined : 'Required')

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: ''
    }
  }

  addSomething(valuesFromWizard) {
    this.setState({ values: valuesFromWizard });
  }

  onSubmit = values => {
    const { firebase } = this.props;
    // console.log(values);
    // await sleep(1000);
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
      }).catch((error) => {
        // this.setState(this.byPropKey('error', error));
        // console.log(error);
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
            addSomething={(values => this.addSomething(values))}
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
            <Wizard.Page>
              <Typography variant="h5">You did it!</Typography>
              <SignUpForm firstName={this.state.values.firstName} />
            </Wizard.Page>
          </Wizard >
        </div>
      </div>
    )
  }
}

export default firebaseConnect()(Quiz)