import React from 'react'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import validate from './validate'
import renderField from './renderField'
import { connect } from 'react-redux'
import { compose } from 'recompose';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import DateHelpers from '../helpers/Date'
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import yellow from '@material-ui/core/colors/yellow';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';

const renderError = ({ meta: { touched, error } }) =>
  touched && error ? <span>{error}</span> : false

const styles = theme => ({
  formControl: {
    display: 'flex',
    flexBasis: '100%',
    alignItems: 'stretch',
    margin: theme.spacing.unit * 3 / 2
  },
  formGroup: {
    alignItems: 'stretch',
    justifyContent: 'space-around',
    flexWrap: 'nowrap'
  },
  radioFlex: {
    flex: '1 1 auto',
    margin: '0 5px'
  },
  greenButtonRoot: {
    backgroundColor: '#00000004',
    borderRadius: 5,
    border: '1px solid',
    color: green.A700,
    fontFamily: 'monospace',
    fontSize: '180%',
    height: 32,
    '&$checked': {
      backgroundColor: green.A700,
      color: 'white'
    },
    '&:not($checked):hover': {
      backgroundColor: green['50']
    },
    transition: 'background-color 250ms'
  },
  yellowButtonRoot: {
    backgroundColor: '#00000004',
    borderRadius: 5,
    border: '1px solid',
    color: yellow['700'],
    fontFamily: 'monospace',
    fontSize: '200%',
    height: 32,
    '&$checked': {
      backgroundColor: yellow.A700,
      color: 'white'
    },
    '&:not($checked):hover': {
      backgroundColor: yellow['100']
    },
    transition: 'background-color 250ms'
  },
  redButtonRoot: {
    backgroundColor: '#00000004',
    borderRadius: 5,
    border: '1px solid',
    color: red.A700,
    fontFamily: 'monospace',
    fontSize: '160%',
    height: 32,
    '&$checked': {
      backgroundColor: red.A700,
      color: 'white'
    },
    '&:not($checked):hover': {
      backgroundColor: red['50']
    },
    transition: 'background-color 250ms'
  },
  greyButtonRoot: {
    backgroundColor: '#00000004',
    borderRadius: 5,
    border: '1px solid',
    color: grey['700'],
    fontFamily: 'monospace',
    fontSize: '180%',
    height: 32,
    '&$checked': {
      backgroundColor: grey['700'],
      color: 'white'
    },
    '&:not($checked):hover': {
      backgroundColor: grey['200']
    },
    transition: 'background-color 250ms'
  },
  disabled: {
    backgroundColor: '#00000004'
  },
  checked: {}
});

const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
    <TextField
      label={label}
      placeholder={label}
      error={touched && invalid}
      helperText={touched && error}
      {...input}
      {...custom}
    />
  )

let Quiz2 = props => {
  const { handleSubmit, previousPage, firstName } = props;
  const {
    classes,
    error,
    required,
    id,
    label,
    name,
    binaryChoice,
    value,
    onChange,
    onBlur
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <Typography variant="h5">Hey {firstName}! You wake up ready to take on the day - open up your closet, what outfit are you picking for this {DateHelpers.getNearestDay()} morning? </Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl className={classes.formControl} required={required}>
            <InputLabel
              error={error}
              required={required}
              shrink
              style={{
                position: 'relative',
                marginBottom: '10px'
              }}
            >
              {label}
            </InputLabel>
            <RadioGroup
              className={classes.formGroup}
              row

              id={id}
              name={name}

              value={value}
              onChange={onChange}
              onBlur={onBlur}
            >
              <Radio
                htmlFor={id}
                className={classes.radioFlex}

                value="good"
                classes={{
                  root: classes.greenButtonRoot,
                  checked: classes.checked
                }}
                icon="〇"
                checkedIcon="〇"
              />
              <Radio
                htmlFor={id}
                className={classes.radioFlex}

                value="okay"
                classes={{
                  root: classes.yellowButtonRoot,
                  checked: classes.checked,
                  disabled: classes.disabled
                }}
                icon="△"
                checkedIcon="△"
                disabled={binaryChoice}
              />
              <Radio
                htmlFor={id}
                className={classes.radioFlex}

                value="bad"
                classes={{
                  root: classes.redButtonRoot,
                  checked: classes.checked
                }}
                icon="✕"
                checkedIcon="✕"
              />
              <Radio
                htmlFor={id}
                className={classes.radioFlex}

                value="na"
                classes={{
                  root: classes.greyButtonRoot,
                  checked: classes.checked
                }}
                icon="－"
                checkedIcon="－"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={16} justify="center">
            <Grid item>
              <Button variant="outlined" type="button" className="previous" onClick={previousPage}>
                Back
        </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" type="submit" className="next">
                Next
        </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
}

// Quiz2 = reduxForm({
//   form: 'wizard' // a unique identifier for this form
// })(Quiz2)

// Decorate with connect to read form values
const selector = formValueSelector('wizard') // <-- same as form name
Quiz2 = connect(state => {
  // can select values individually
  const firstName = selector(state, 'firstName');
  return {
    firstName
  }
})(Quiz2)

Quiz2 = connect(
  state => ({
    values: {
      family: state.form.wizard.values
    }
  })
)(Quiz2)

Quiz2.propTypes = {
  classes: PropTypes.object.isRequired,
  required: PropTypes.bool,
  error: PropTypes.bool,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  binaryChoice: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func
};

Quiz2.defaultProps = {
  required: false,
  binaryChoice: false,
  error: false,
  onBlur: null,
  value: ''
};

export default compose(
  withStyles(styles),
  reduxForm({
    form: 'wizard', //Form name is same
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    validate
  }))(Quiz2)