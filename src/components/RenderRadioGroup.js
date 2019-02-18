import React from "react";
import Radio from "@material-ui/core/Radio";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from '@material-ui/core/FormControl'
import { Component } from "react";
import RadioGroup from '@material-ui/core/RadioGroup'
import Grid from "@material-ui/core/Grid";
import Grow from "@material-ui/core/Grow"
import { connect } from 'react-redux'
import { Field, formValueSelector } from 'redux-form'
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
      onChangeHandler: this.props.onChangeHandler,
      props: this.props,
      classes: this.props.classes,
      selected: {},
      questionName: this.props.questionName
    };
  }

  required = value => (value || typeof value === 'number' ? undefined : 'Required')

  Wire = ({ children, ...props }) => children(props);

  radioButton = ({ input, buttons, classes, ...rest }) => (
    <FormControl>
      <RadioGroup {...input} {...rest}>
        <Grid container justify="center" alignItems="center" direction="row">
          {this.state.buttons.map((button, key) => (
            <Grid checked={this.state.dress === [button.value]} className={this.state.classes.quizOption} key={key} item xs={12} sm={6} md={6} lg={3}>
              <FormControlLabel
                {...console.log(this.state)}
                className={`${(this.state.props[this.state.props.questionName] === button.value || this.state.selected[button.value]) ? (this.state.classes.quizOptionLabelSelected) : (this.state.classes.quizOptionLabel)}`}
                checked={this.state.props[this.state.props.questionName] === button.value}
                key={key}
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
      </RadioGroup>
    </FormControl>
  )

  // radioButton = ({ input, ...rest }) => (
  //   <FormControl>
  //     <RadioGroup {...input} {...rest}>
  //       <FormControlLabel value="female" control={<Radio color="primary"/>} label="Female" />
  //       <FormControlLabel value="male" control={<Radio color="primary"/>} label="Male" />
  //     </RadioGroup>
  //   </FormControl>
  // )

  change = value => {
    let temp = {};
    temp[value] = true;
    this.setState({
      selected: temp
    });
  };

  render() {
    console.log(this.state.selected);
    return (
      <Grow timeout={500} in={true}>
        {/* <Field validate={[this.required]} name={this.state.name} component={this.radioButton}>
          <Radio value="0" label="Casual" />
          <Radio value="1" label="Business Casual" />
        </Field> */}
        <Field name={this.state.questionName} component={this.radioButton}>
          {/* <Radio value="male" label="male" />
          <Radio value="female" label="female" /> */}
        </Field>
      </Grow>
    );
  }
}

const selector = formValueSelector('wizard') // <-- same as form name
RenderRadioGroup = connect(state => {
  // can select values individually
  const dress = selector(state, 'dress');
  return {
    dress
  }
})(RenderRadioGroup)

export default withStyles(styles)(RenderRadioGroup);