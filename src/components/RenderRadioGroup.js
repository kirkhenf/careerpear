import React from "react";
import PropTypes from "prop-types";
import Radio from "@material-ui/core/Radio";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Grow from "@material-ui/core/Grow"

export class RenderRadioGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: this.props.input,
      buttons: this.props.buttons,
      onChangeHandler: this.props.onChangeHandler,
      props: this.props,
      selected: { option1: true }
    };
  }

  render() {
    const change = value => {
      let temp = {};
      temp[value] = true;
      this.setState({
        selected: temp
      });
    };

    return (
      <Grow timeout={500} in={true}>
        <FormGroup role="radiogroup" {...this.state.props} {...this.state.input}>
          <Grid container justify="center" alignItems="center" direction="row">
            {this.state.buttons.map((button, key) => (
              <Grid key={key} item xs={12} sm={6} md={6} lg={3}>
                <FormControlLabel
                  {...this.state.props}
                  id={button.value}
                  checked={this.state.props.value === button.value}
                  value={button.value}
                  onChange={event => {
                    change(button.value);
                  }}
                  control={
                    <Radio
                      color="primary"
                      checked={this.state.selected[button.value]}
                    />
                  }
                  label={button.name}
                />
              </Grid>
            ))}
          </Grid>
        </FormGroup>
      </Grow>
    );
  }
}

RenderRadioGroup.propTypes = {
  input: PropTypes.object.isRequired,
  buttons: PropTypes.array.isRequired,
  onChangeHandler: PropTypes.func
};

export default RenderRadioGroup;