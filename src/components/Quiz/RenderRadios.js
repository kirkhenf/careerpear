import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import { Field } from 'react-final-form'
import { Radio } from "final-form-material-ui";
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import NormalRadio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import './RenderRadios.css'
import { Avatar } from "@material-ui/core";


const styles = theme => ({
  image: {
    width: '100%',
    height: '100%'
  },
  quizOption: {
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
    width: '90%'
  },
  label: {
    color: 'white',
    textAlign: 'left',
    padding: '5px',
    maxHeight: '100%',
    maxWidth: '100%'
  },
  imageLabel: {
    display: 'inline-grid',
    height: '100%',
    width: '100%'
  }
});

const RenderWizardRadios = props => {
  const { options, classes, questionName } = props;
  return (
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
        ))
      }
    </Grid>
  )
}

const RenderNormalRadios = props => {
  const { options, classes, questionName, handleChange } = props;
  return (
    <Grid container className="quizOptionsGrid" justify="center" alignItems="center">
      {
        options.map((option, key) => (
          <Grid className="answer" key={key} item xs={12} sm={12} md={12} lg={12}>
            <RadioGroup className="normalRadio" value={questionName}>
              <FormControlLabel
                classes={{ root: classes.quizOption, label: classes.label }}
                label={option.label}
                className="quizOption"
                control={<NormalRadio icon={<Avatar className="radio">{(String.fromCharCode(97 + key)).toUpperCase()}</Avatar>} />}
                value={option.value}
                onClick={handleChange}
              />
            </RadioGroup>
          </Grid>
        ))}
    </Grid>
  )
}

const RenderImageRadios = props => {
  const { options, classes, questionName } = props;
  return (
    <Grid container className="quizOptionsGrid" justify="center" alignItems="center">
      {
        options.map((option, key) => (
          <Grid className="answer" key={key} item xs={12} sm={12} md={12} lg={12}>
            <FormControlLabel
              classes={{ root: classes.quizOption, label: classes.imageLabel }}
              className="quizOption"
              label={<img className={classes.image} src={option.imageSrc} />}
              control={
                <Field
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
  )
}

const ImageRadios = withStyles(styles)(RenderImageRadios);
const NormalRadios = withStyles(styles)(RenderNormalRadios);
const WizardRadios = withStyles(styles)(RenderWizardRadios);

export { ImageRadios, NormalRadios, WizardRadios };

export default withStyles(styles)(WizardRadios);