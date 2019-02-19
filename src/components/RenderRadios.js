import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from '@material-ui/core/FormControl'
import RadioGroup from '@material-ui/core/RadioGroup'
import Grid from "@material-ui/core/Grid";
import Grow from "@material-ui/core/Grow"
import { Field } from 'react-final-form'
import { Radio } from "final-form-material-ui";
import { withStyles } from '@material-ui/core/styles';

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
    minWidth: '50%',
    marginRight: "0",
    marginLeft: "0",
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
});

const RenderRadios = props => {
  const { options, classes, questionName } = props;
  return (
    <Grow timeout={500} in={true}>
      <Grid container justify="center" alignItems="center" direction="row" >
        {
          options.map((option, key) => (
            <Grid className="quizOptionGrid" key={key} item xs={12} sm={6} md={6} lg={3}>
              <FormControlLabel
                {...console.log(classes.quizOption)}
                className={classes.quizOption}
                label={option.label}
                control={
                  <Field
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
  )
}

export default withStyles(styles)(RenderRadios);