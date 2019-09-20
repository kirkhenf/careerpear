import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Grow from "@material-ui/core/Grow"
import { Field } from 'react-final-form'
import { Radio } from "final-form-material-ui";
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import NormalRadio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import './RenderRadios.css'
import { Avatar } from "@material-ui/core";


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
    radio: {
      color: 'yellow',
    },
    color: 'white',
    background: 'transparent',
    '&:hover': {
      background: "white",
      boxShadow: '0 0 11px rgba(33,33,33,.33)',
      transition: 'all .2s ease-in-out',
      transform: 'scale(1.05)'
    },
    '&:hover $label': {
      color: "black",
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
    textAlign: 'left',
    '& $label': {
      width: '100%',
      padding: '5px'
    },
  }
});

const RenderWizardRadios = props => {
  const { options, classes, questionName, questionText } = props;
  return (
    <Grid container justify="flex-end" className="questionGrid" spacing={16}>
      <Grid className="questionTextContainer" container item xs={12}>
        <Typography className="questionText" variant="h5">{questionText}</Typography>
      </Grid>
      <div style={{ width: '80%', borderBottom: '2px dotted white', margin: '10px auto' }} />
      <Grid className="outerAnswers" item xs={12}>
        <Grow timeout={500} in={true}>
          <Grid container className="quizOptionsGrid" justify="center" alignItems="center">
            {
              options.map((option, key) => (
                <Grid className="answer" key={key} item xs={12} sm={12} md={12} lg={12}>
                  <FormControlLabel
                    classes={{ root: classes.quizOption, label: classes.label }}
                    label={option.label}
                    className="quizOption"
                    control={
                      <Field
                        classes={{ root: 'radio' }}
                        name={questionName}
                        icon={<Avatar className="radio">{(String.fromCharCode(97 + key)).toUpperCase()}</Avatar>}
                        color="primary"
                        component={Radio}
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
    <Grid container justify="flex-end" className="questionGrid" spacing={16}>
      <Grid className="questionTextContainer" container item xs={12}>
        <Typography className="questionText" variant="h5">{questionText}</Typography>
      </Grid>
      <div style={{ width: '80%', borderBottom: '2px dotted white', margin: '10px auto' }} />
      <Grid className="outerAnswers" item xs={12}>
        <Grow timeout={500} in={true}>
          <Grid container className="quizOptionsGrid" justify="center" alignItems="center">
            {
              options.map((option, key) => (
                <Grid className="answer" key={key} item xs={12} sm={12} md={12} lg={12}>
                  <RadioGroup className="normalRadio" value={questionName}>
                    <FormControlLabel
                      classes={{ root: classes.quizOption, label: classes.label }}
                      label={option.label}
                      className="quizOption"
                      control={<NormalRadio icon={<Avatar>{(String.fromCharCode(97 + key)).toUpperCase()}</Avatar>} className="radio" />}
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
      <div style={{ width: '80%', borderBottom: '2px dotted white', margin: '10px auto' }} />
      <Grid className="outerAnswers" item xs={12}>
        <Grow timeout={500} in={true}>
          <Grid container className="quizOptionsGrid" container justify="center" alignItems="center">
            {
              options.map((option, key) => (
                <Grid className="answer" key={key} item xs={12} sm={12} md={12} lg={12}>
                  <FormControlLabel
                    classes={{ root: classes.quizOption, label: classes.label }}
                    className="quizOption"
                    label={<img className={classes.image} src={option.imageSrc} />}
                    control={
                      <Field
                        classes={{ root: 'radio' }}
                        name={questionName}
                        icon={<Avatar>{(String.fromCharCode(97 + key)).toUpperCase()}</Avatar>}
                        color="primary"
                        component={Radio}
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