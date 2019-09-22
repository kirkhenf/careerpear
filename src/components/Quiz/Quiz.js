import React, { Suspense } from 'react'
import { withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux'
import LinearProgress from '@material-ui/core/LinearProgress'
import useFetch from 'fetch-suspense';
import CircularProgress from '@material-ui/core/CircularProgress';
import PlayArrow from '@material-ui/icons/PlayArrow'
import ReactGA from 'react-ga';
import { useState, useEffect } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid'
import Slide from '@material-ui/core/Slide';
import Grow from "@material-ui/core/Grow"

// Page imports
import Wizard from './Wizard'
import SignUpForm from '../Authentication/SignUp'
import './Quiz.css'
import { ImageRadios, NormalRadios, WizardRadios } from './RenderRadios'
import { addQuizResults } from '../../actions';

const required = value => (value ? undefined : 'Required')

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brain: null,
      values: '',
      pageProgress: 0,
      isFetching: false,
      numPages: 0,
      currentPage: 0
    }
  }

  componentDidMount() {
    ReactGA.ga('send', 'pageview', '/quiz');
  }

  handleChange = (event) => {
    var value = event.target.value;
    this.setState(state => ({
      brain: value
    }))
    this.addSomething(value);
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
        <Grid className="signUpForm" item>
          <SignUpForm />
          <Button className="submitButton" color="secondary" variant="contained" type="submit">Submit</Button>
        </Grid>
      </Wizard.Page>
    )
  }

  QuizQuestions = () => {
    var brain = this.state.brain;
    if (brain == 1) {
      var data = useFetch('https://us-central1-careerpear-10c55.cloudfunctions.net/getCreativeQuiz', { method: 'GET' });
    } else var data = useFetch('https://us-central1-careerpear-10c55.cloudfunctions.net/getLogicalQuiz', { method: 'GET' });
    var wizardArray = [];
    var options = [];
    const { isFetching } = this.props;
    var values = this.state.values;

    if (brain == 0) {
      return (
        <Wizard
          brain={brain}
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
                  label: choice.option,
                  value: JSON.stringify({
                    weight: choice.weight,
                    traitId: value.traitId
                  })
                }
              )
            )),
            <Wizard.Page key={value.questionId}>
              <Grid container justify="flex-end" className="questionGrid" spacing={16}>
                <Grid className="questionTextContainer" container item xs={12}>
                  <Typography className="questionText" variant="h5">{value.question}</Typography>
                </Grid>
                <div style={{ width: '50%', borderBottom: '1px solid white', margin: '10px auto 0px auto' }} />
                <Grid className="outerAnswers" item xs={12}>
                  <Grow timeout={500} in={true}>
                    <WizardRadios
                      questionText={value.question}
                      questionName={value.questionId}
                      options={options}
                    />
                  </Grow>
                </Grid>
              </Grid >
            </Wizard.Page>
          ))}
          <Grid container justify="flex-end" className="questionGrid" spacing={16}>
            <Grid className="questionTextContainer" container item xs={12}>
              <Typography className="questionText" variant="h5">You did it! Sign up to view your results</Typography>
            </Grid>
            <div style={{ width: '50%', borderBottom: '1px solid white', margin: '10px auto 0px auto' }} />
            <Grid className="outerAnswers" item xs={12}>
              <Grow timeout={500} in={true}>
                {this.getSubmissionPage()}
              </Grow>
            </Grid>
          </Grid >
        </Wizard>
      )
    } else if (brain == 1) {
      return (
        <Wizard
          brain={brain}
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
                  value: choice.personaId,
                  imageSrc: choice.imgUrl
                }
              )
            )),
            <Wizard.Page key={value.questionId}>
              <Grid container justify="flex-end" className="questionGrid" spacing={16}>
                <Grid className="questionTextContainer" container item xs={12}>
                  <Typography className="questionText" variant="h5">{value.question}</Typography>
                </Grid>
                <div style={{ width: '50%', borderBottom: '1px solid white', margin: '10px auto 0px auto' }} />
                <Grid className="outerAnswers" item xs={12}>
                  <Grow timeout={500} in={true}>
                    <ImageRadios
                      questionText={value.question}
                      questionName={value.questionId}
                      options={options}
                    />
                  </Grow>
                </Grid>
              </Grid >
            </Wizard.Page>
          ))}
          <Grid container justify="flex-end" className="questionGrid" spacing={16}>
            <Grid className="questionTextContainer" container item xs={12}>
              <Typography className="questionText" variant="h5">You did it! Sign up to view your results</Typography>
            </Grid>
            <div style={{ width: '50%', borderBottom: '1px solid white', margin: '10px auto 0px auto' }} />
            <Grid className="outerAnswers" item xs={12}>
              <Grow timeout={500} in={true}>
                {this.getSubmissionPage()}
              </Grow>
            </Grid>
          </Grid >
        </Wizard>
      )
    } else return wizardArray;
  }

  quizData = require('../../config/questions.json');

  addSomething(valuesFromWizard) {
    this.setState({ values: valuesFromWizard });
  }

  getPageProgress(pageProgress) {
    this.setState({
      currentPage: pageProgress.currentPage + 1,
      numPages: pageProgress.numPages
    });
  }

  onSubmit = (values) => {
    const { addQuizResults, history } = this.props;
    addQuizResults(values, history, this.state.brain);
  }

  byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
  });

  render() {
    const { isFetching } = this.props;
    return (
      <div className="bodyContent">
        <Grid container alignItems="center" className="leftContainer" spacing={16}>
          <Grid container item className="questionNumber">
            {this.state.brain && (this.state.currentPage <= this.state.numPages) && <Typography variant="h5" className="questionNumberText">Question {this.state.currentPage}/{this.state.numPages}</Typography>}
          </Grid>
          <div style={{ width: '50%', borderBottom: '1px solid #e91e63', margin: '10px auto 0px auto' }} />
          <Grid item className="pearAvatarContainer">
            <Slide in={true} direction="right">
              <img className="pearAvatar" src={require('../../assets/dress_business_casual.png')} />
            </Slide>
            <Grid item className="quizInfo">
              <h2>Let's get you pear-ed!</h2>
            </Grid>
          </Grid>
        </Grid>
        <div className="rightContainer">
          <RightCarrot />
          {!this.state.brain &&
            <Grid container justify="flex-end" className="questionGrid" spacing={16}>
              <Grid className="questionTextContainer" container item xs={12}>
                <Typography className="questionText" variant="h5">Which best describes you?</Typography>
              </Grid>
              <div style={{ width: '50%', borderBottom: '1px solid white', margin: '10px auto 0px auto' }} />
              <Grid className="outerAnswers" item xs={12}>
                <Grow timeout={500} in={true}>
                  <NormalRadios
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
                    ]} />
                </Grow>
              </Grid>
            </Grid>
          }
          {this.state.brain && <Suspense fallback={<CircularProgress />}>
            <this.QuizQuestions />
          </Suspense>}
        </div>
        {/* <ProgressNumber progress={this.state.pageProgress} />
        <LinearProgress className="progressBar" variant="determinate" value={this.state.pageProgress}>Test</LinearProgress> */}
      </div >
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
    addQuizResults: (quizResults, history, brain) => dispatch(addQuizResults(quizResults, history, brain))
  }
}

const RightCarrot = () => {
  const { width } = useWindowDimensions();
  var halfpoint = width / 2;
  var style = {
    position: 'absolute',
    left: halfpoint - 14,
    top: '75px',
    fontSize: '40px',
    color: 'white'
  }
  return (
    <PlayArrow style={style} />
  );
}



function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  firebaseConnect())(Quiz)