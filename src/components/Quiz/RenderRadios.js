import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Grow from "@material-ui/core/Grow"
import { Field } from 'react-final-form'
import { Button } from '@material-ui/core/Button'
import { Radio } from "final-form-material-ui";
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import NormalRadio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import Input from '@material-ui/core/Input';
import './RenderRadios.css'


const styles = theme => ({
  quizOptionLabelSelected: {
    border: "2px solid #297A6D !important",
    minWidth: '50%',
    marginRight: "0",
    marginLeft: "0",
    borderRadius: "4px",
    width: '80%'
  },
  image: {
    maxWidth: '100%',
    maxHeight: '100%'
  },
  quizOption: {
    '&:hover $label': {
      color: 'black'
    },
    color: 'white',
    background: 'transparent',
    '&:hover': {
      background: "white",
      color: "black",
      boxShadow: '0 0 11px rgba(33,33,33,.2)',
      transition: 'all .2s ease-in-out',
      transform: 'scale(1.05)'
    },
    // border: '2px solid #297A6D',
    '& $label': {
      textAlign: 'center',
      width: '100%',
      paddingTop: '15px',
      paddingBottom: '15px'
    },
    minWidth: '50%',
    marginRight: "auto",
    height: "100%",
    marginLeft: "auto",
    borderRadius: "4px",
    width: '80%'
  },
  label: {
    color: 'white',
    '& $label': {
      textAlign: 'center',
      width: '100%',
      padding: '5px'
    },
  },
  normalRadio: {
    display: 'none'
  }
});

const RenderWizardRadios = props => {
  const { options, classes, questionName, questionText } = props;
  return (
    <Grid container justify="flex-end" className="questionGrid" spacing={16}>
      <Grid className="questionTextContainer" justifyContent="flex-end" container item xs={12}>
        <Typography item className="questionText" variant="h5">{questionText}</Typography>
      </Grid>
      <div style={{ width: '80%', borderBottom: '2px dotted white', margin: 'auto', paddingTop: '15px' }} />
      <Grid className="outerAnswers" item xs={12}>
        <Grow timeout={500} in={true}>
          <Grid container className="quizOptionsGrid" justify="center" alignItems="center">
            {
              options.map((option, key) => (
                <Grid key={key} item xs={12} sm={12} md={12} lg={12}>
                  <FormControlLabel
                    classes={{ root: classes.quizOption, label: classes.label }}
                    label={option.label}
                    control={
                      <Field
                        classes={{ root: classes.label }}
                        name={questionName}
                        color="primary"
                        component="input"
                        type="radio"
                        value={option.value}
                      />
                    }
                  />
                </Grid>
              ))}
          </Grid>
        </Grow>
      </Grid>
    </Grid>
  )
}

const RenderNormalRadios = props => {
  const { options, classes, questionName, questionText, handleChange } = props;
  return (
    <Grid container className="questionGrid" spacing={16}>
      <Grid className="questionTextContainer" item xs={12}>
        <Typography className="questionText" variant="h5">{questionText}</Typography>
      </Grid>
      <div style={{ width: '80%', borderBottom: '2px dotted white', margin: 'auto', paddingTop: '15px' }} />
      <Grid className="outerAnswers" item xs={12}>
        <Grow timeout={500} in={true}>
          <Grid container className="quizOptionsGrid" justify="center" alignItems="center">
            {
              options.map((option, key) => (
                <Grid key={key} item xs={12} sm={12} md={12} lg={12}>
                  <RadioGroup value={questionName}>
                    <FormControlLabel
                      classes={{ root: classes.quizOption, label: classes.label }}
                      label={option.label}
                      control={<NormalRadio classes={{ root: classes.normalRadio }} />}
                      value={option.value}
                      onClick={handleChange}
                    />
                  </RadioGroup>
                </Grid>
              ))}
          </Grid>
        </Grow>
      </Grid>
    </Grid>
  )
}

const RenderImageRadios = props => {
  const { options, classes, questionName, questionText } = props;
  return (
    <Grid container justify="flex-end" className="questionGrid" spacing={16}>
      <Grid className="questionTextContainer" item xs={12}>
        <Typography className="questionText" variant="h5">{questionText}</Typography>
      </Grid>
      <div style={{ width: '80%', borderBottom: '2px dotted white', margin: 'auto', paddingTop: '15px' }} />
      <Grid className="outerAnswers" item xs={12}>
        <Grow timeout={500} in={true}>
          <Grid container justify="center" alignItems="center">
            {
              options.map((option, key) => (
                <Grid className="quizOptionGrid" key={key} item xs={12} sm={6} md={6} lg={3}>
                  <FormControlLabel
                    classes={{ root: classes.quizOption, label: classes.label }}
                    label={<img className={classes.image} src={option.imageSrc} />}
                    control={
                      <Field
                        classes={{ root: classes.label }}
                        name={questionName}
                        color="primary"
                        component="input"
                        type="radio"
                        value={option.value}
                      />
                    }
                  />
                </Grid>
              ))}
          </Grid>
        </Grow>
      </Grid>
    </Grid>
  )
}

const ImageRadios = withStyles(styles)(RenderImageRadios);
const NormalRadios = withStyles(styles)(RenderNormalRadios);
const WizardRadios = withStyles(styles)(RenderWizardRadios);

export { ImageRadios, NormalRadios, WizardRadios };

export default withStyles(styles)(WizardRadios);