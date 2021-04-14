import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Typography } from '@material-ui/core';
import { getFirebase } from 'react-redux-firebase';
import { CircularProgress } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import Grow from "@material-ui/core/Grow"
import Hidden from '@material-ui/core/Hidden';
import Slider from '@material-ui/core/Slider';
import PlayArrow from '@material-ui/icons/PlayArrow'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'
import { useState, useEffect } from 'react';

// File imports
import withAuthorization from './Authentication/withAuthorization';
import './Home.css'

const trait1Marks = [
  {
    value: 0,
    label: 'Test',
  },
  {
    value: 100,
    label: 'Test',
  },
];


const styles = theme => ({
  questionTextContainer: {
    flex: '0.75 !important',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      backgroundColor: 'white'
    },
  },
  disabledButton : {
    root: {
      color: '#52af77',
      height: 8,
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      marginTop: -8,
      marginLeft: -12,
      '&:focus, &:hover, &$active': {
        boxShadow: 'inherit',
      },
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 4px)',
    },
    track: {
      height: 8,
      borderRadius: 4,
    },
    rail: {
      height: 8,
      borderRadius: 4,
    },
  },
  questionText: {
    color: 'white',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    padding: '0px 15px 0px 15px',
    [theme.breakpoints.down('sm')]: {
      color: 'black',
      fontSize: '1.2rem',
      margin: 'auto'
    },
  },
  downArrow: {
    fontSize: '5rem',
    marginTop: '-2.2rem',
    color: 'white',
    alignSelf: 'center'
  },
  dividers: {
    [theme.breakpoints.down('sm')]: {
      marginBottom: -'2.2rem'
    },
  }
});

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props };
  }

  async componentDidMount() {
    let currentComponent = this;
    var fBase = getFirebase();
    try {
      fBase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function (idToken) {
        var bearer = 'Bearer ' + idToken;
        fetch('https://us-central1-careerpear-10c55.cloudfunctions.net/getQuizResults', {
          method: 'GET',
          withCredentials: true,
          credentials: 'include',
          headers: {
            'Authorization': bearer,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        })
          .then((response) => {
            return response.json().then((results) => {
              console.log(results);
              currentComponent.setState({ results: results });
            });
          });
      }).catch(function (error) {
        console.log(error)
      });
    } catch (error) {
      console.log(error);
    }
  }

  getPersonaResults() {
    if (this.state.results) {
      if (this.state.results.persona) {
        return <p>{JSON.stringify(this.state.results.persona)}</p>;
      } else return <p>No results found. Take the persona quiz!</p>
    }
  }

  getLogicalTraits() {
    if (this.state.results) {
      if (this.state.results.logical) {
        return <p>{JSON.stringify(this.state.results.logical)}</p>;
      } else return <p>Yet to be determined! Take the logical quiz!</p>
    }
  }

  getPersonaName() {
    if (this.state.results) {
      if (this.state.results.persona) {
        return "You are " + this.state.results.persona.personaName;
      } else return "You are..."
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container className="bodyContent">
        <Hidden xsDown>
          <Grid sm={6} item container alignItems="center" className="leftContainer" spacing={16}>
            <Grid container item className="questionNumber">
              <Typography variant="h5" className="questionNumberText">{this.getPersonaName()}</Typography>
            </Grid>
            <div style={{ width: '50%', borderBottom: '1px solid #e91e63', margin: '10px auto 0px auto' }} />
            <Grid item className="pearAvatarContainer">
              {/* <Slide in={true} direction="right">
                <img className="pearAvatar" src={require('../../assets/dress_business_casual.png')} />
              </Slide> */}
              <Grid item className="quizInfo">
                {this.getPersonaResults()}
              </Grid>
            </Grid>
          </Grid>
        </Hidden>
        <Grid xs={12} sm={6} item className="rightContainer">
          <Hidden xsDown><RightCarrot /></Hidden>
          {!this.state.brain &&
            <Grid container justify="flex-end" className="questionGrid" spacing={16}>
              <Grid classes={{ item: classes.questionTextContainer }} container item xs={12}>
                <Typography classes={{ root: classes.questionText }} variant="h5">Your traits are...</Typography>
              </Grid>
              <div className="divider">
                <Hidden smDown><div style={{ width: '50%', borderBottom: '1px solid white', margin: '10px auto 0px auto' }} /></Hidden>
                <Hidden smUp><ArrowDropDown classes={{ root: classes.downArrow }} /></Hidden>
              </div>
              <Grid className="outerAnswers" item xs={12}>
                <Grid>
                  <Typography id="discrete-slider" gutterBottom>
                    Trait 1
                </Typography>
                  <Slider
                    defaultValue={30}
                    // getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={25}
                    marks={trait1Marks}
                    track={false}
                    min={0}
                    max={100}
                    disabled
                    classes={{ disabled: classes.disabledButton }}
                  />
                </Grid>
                <Grid>
                  <Typography id="discrete-slider" gutterBottom>
                    Trait 2
                </Typography>
                  <Slider
                    defaultValue={30}
                    // getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    track={false}
                    step={25}
                    marks={trait1Marks}
                    min={0}
                    max={100}
                    disabled
                    classes={{ disabled: classes.disabledButton }}
                  />
                </Grid>

                {this.getLogicalTraits()}
              </Grid>
            </Grid>
          }
        </Grid>
      </Grid >
    );
  }
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

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser
});

const mapDispatchToProps = (dispatch) => ({

});

const authCondition = (authUser) => !!authUser;

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

export default compose(
  // withAuthorization(authCondition),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(HomePage);