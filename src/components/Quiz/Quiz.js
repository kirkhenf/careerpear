import React, { Suspense } from 'react'
import { withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'
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
        <Typography variant="h5">You did it!</Typography>
        <SignUpForm
          firstName={this.state.values.firstName} />
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
    if (brain == 0) { // Logical Quiz
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
    } else if (brain == 1) // Creative quiz
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
              <ImageRadios
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
    addQuizResults(values, history, this.state.brain);
  }

  byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
  });

  render() {
    const { isFetching } = this.props;
    return (
      <div className="bodyContent">
        <Grid container alignItems="center" justify="center" className="question">
          <Grid item className="pearAvatarContainer">
            <Slide in={true} direction="right">
              <img className="pearAvatar" src={require('../../assets/dress_business_casual.png')} />
            </Slide>
            {/* <Skeleton variant="circle" width={200} height={200} /> */}
          </Grid>
          <Grid item className="quizInfo">
            <h2>Hi hey hello</h2>
          </Grid>
        </Grid>
        <div className="quizContent">
          <RightCarrot/>
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
        <ProgressNumber progress={this.state.pageProgress} />
        <LinearProgress className="progressBar" variant="determinate" value={this.state.pageProgress}>Test</LinearProgress>
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

const ProgressNumber = (pageProgress) => {

  const { width } = useWindowDimensions();
  var currentWidth = (width * pageProgress.progress / 100);
  var style = {
    position: 'absolute',
    left: '0px',
    bottom: '0px',
    width: currentWidth,
    textAlign: 'center',
    transition: 'width 0.5s',
    lineHeight: 'normal',
    marginBottom: '0px',
    fontSize: '10px',
    color: 'white',
    zIndex: '1',
  }
  return (
    <div style={style}>
      {Math.round(pageProgress.progress)}%
    </div>
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