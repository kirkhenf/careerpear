import React from "react";
import Radio from "@material-ui/core/Radio";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Grow from "@material-ui/core/Grow"
import { Field } from 'redux-form'
import { withStyles } from '@material-ui/core/styles';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

// const defaultTheme = createMuiTheme();
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
    [theme.breakpoints.down('xs')]: {
      marginRight: "10px"
    },
    padding: "8px"
  },
  quizOptionLabel: {
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
      minWidth: '80%'
    },
  },
});

export class RenderRadioGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: this.props.input,
      buttons: this.props.buttons,
      name: this.props.name,
      onChangeHandler: this.props.onChangeHandler,
      props: this.props,
      classes: this.props.classes,
      selected: {}
    };
  }

  required = value => (value || typeof value === 'number' ? undefined : 'Required')

  radioButton = ({ input, buttons, classes, ...rest }) => (
    // <FormControl>
    <FormGroup row role="radiogroup" {...input} {...rest}>
      <Grid container justify="center" alignItems="center" direction="row">
        {this.state.buttons.map((button, key) => (
          <Grid checked={this.state.selected[button.value]} className={this.state.classes.quizOption} key={key} item xs={12} sm={6} md={6} lg={3}>
            <FormControlLabel
              classes={{
                label: this.state.classes.label,
              }}
              // className={this.state.classes.quizOptionLabel} id={button.value}
              className={`${this.state.selected[button.value] ? (this.state.classes.quizOptionLabelSelected) : (this.state.classes.quizOptionLabel)}`}
              checked={this.state.props.value === button.value}
              value={button.value}
              onChange={event => { this.change(button.value) }}
              value={button.value}
              control={<Radio
                checked={this.state.selected[button.value]}
                classes={{
                  checked: this.state.classes.checked,
                }}
                color="primary" />}
              label={button.name} />
          </Grid>
        ))}
      </Grid>
    </FormGroup>
  )

  change = value => {
    let temp = {};
    temp[value] = true;
    this.setState({
      selected: temp
    });
  };

  render() {
    return (
      <Grow timeout={500} in={true}>
        <Field validate={[this.required]} name={this.state.name} component={this.radioButton}></Field>
      </Grow>
    );
  }
}

export default withStyles(styles)(RenderRadioGroup);