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
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const styles = theme => ({
  quizOptionLabelSelected: {
    border: "2px solid #297A6D !important",
    minWidth: '50%',
    marginRight: "0",
    marginLeft: "0",
    borderRadius: "4px",
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    },
    [theme.breakpoints.down('sm')]: {
      minWidth: '80%'
    },
    [theme.breakpoints.down('md')]: {
      minWidth: '60%'
    },
    [theme.breakpoints.down('lg')]: {
      minWidth: '80%'
    },
  },
  quizOption: {
    '&:hover $label': {
      color: 'white'
    },
    '&:hover': {
      background: "#297A6D"
    },
    minWidth: '50%',
    marginRight: "auto",
    marginLeft: "auto",
    border: "1px solid rgba(0, 0, 0, 0.23)",
    borderRadius: "4px",
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    },
    [theme.breakpoints.down('sm')]: {
      minWidth: '80%'
    },
    [theme.breakpoints.down('md')]: {
      minWidth: '60%'
    },
    [theme.breakpoints.down('lg')]: {
      width: '300px',
      maxWidth: '80%'
    },
  },
  label: {}
});

const RenderWizardRadios = props => {
  const { options, classes, questionName, questionText } = props;
  return (
    <Grid container spacing={16}>
      <Grid item xs={12}>
        <Typography className="questionText" variant="h5">{questionText}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grow timeout={500} in={true}>
          <Grid container justify="center" alignItems="center" direction="row" >
            {
              options.map((option, key) => (
                <Grid className="quizOptionGrid" key={key} item xs={12} sm={6} md={6} lg={3}>
                  <FormControlLabel
                    classes={{ root: classes.quizOption, label:classes.label }}
                    label={option.label}
                    control={
                      <Field
                        classes={{ root: classes.label }}
                        name={questionName}
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
    <Grid container spacing={16}>
      <Grid item xs={12}>
        <Typography className="questionText" variant="h5">{questionText}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grow timeout={500} in={true}>
          <Grid container justify="center" alignItems="center" direction="row" >
            {
              options.map((option, key) => (
                <Grid className="quizOptionGrid" key={key} item xs={12} sm={6} md={6} lg={3}>
                    <RadioGroup value={questionName}>
                      <FormControlLabel
                        classes={{ root: classes.quizOption, label:classes.label }}
                        label={option.label}
                        control={<NormalRadio classes={{ root: classes.label }} color="primary" />}
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
  const { options, classes, questionName, questionText, handleChange } = props;
  return (
    <Grid container spacing={16}>
      <Grid item xs={12}>
        <Typography className="questionText" variant="h5">{questionText}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grow timeout={500} in={true}>
          <Grid container justify="center" alignItems="center" direction="row" >
            {
              options.map((option, key) => (
                <Grid className="quizOptionGrid" key={key} item xs={12} sm={6} md={6} lg={3}>
                    <RadioGroup value={questionName}>
                      <FormControlLabel
                        classes={{ root: classes.quizOption, label:classes.label }}
                        label={<img src={option.imageSrc} />}
                        control={<NormalRadio classes={{ root: classes.label }} color="primary" />}
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

const ImageRadios = withStyles(styles)(RenderImageRadios);
const NormalRadios = withStyles(styles)(RenderNormalRadios);
const WizardRadios = withStyles(styles)(RenderWizardRadios);

export { ImageRadios, NormalRadios, WizardRadios };

export default withStyles(styles)(WizardRadios);