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
  quizOption: {
    [theme.breakpoints.down('xs')]: {
      textAlign: "left"
    },
    padding: "10px"
  },
  quizOptionLabel: {
    minWidth: '50%',
    border: "5px solid #297A6D",
  }
});

export class RenderRadioGroup extends Component {
  constructor(props) {
    super(props);
    console.log(props);
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
    <FormGroup role="radiogroup" {...input} {...rest}>
      <Grid container justify="center" alignItems="center" direction="row">
        {this.state.buttons.map((button, key) => (
          <Grid className={this.state.classes.quizOption} key={key} item xs={12} sm={6} md={6} lg={3}>
            <FormControlLabel className={this.state.classes.quizOptionLabel} id={button.value}
              checked={this.state.props.value === button.value}
              value={button.value}
              onChange={event => { this.change(button.value) }}
              value={button.value}
              control={<Radio
                checked={this.state.selected[button.value]}
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