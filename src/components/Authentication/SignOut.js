import React, { Component } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { firebaseConnect } from 'react-redux-firebase'

const SignOutButton = ({ history, firebase }) =>
  <SignOutForm firebase={firebase} />

const INITIAL_STATE = {
  
};

class SignOutForm extends Component {
  constructor(props) {
    super(props);
    this.state = { INITIAL_STATE };
  }

  doSignOut = () => {
    console.log(this.props);
    // const { firebase } = this.props.firebase;
    this.props.firebase.logout().then(function () {
      handleClose();
    });
  }

  render() {
    return (
      <MenuItem
        type="button"
        onClick={this.doSignOut}
      >
        Sign Out
  </MenuItem>
    );
  };
}

// const doSignOut = () => {
//   const { firebase } = this.props.firebase;
//   firebase.logout().then(function () {
//     handleClose();
//   });
// }

const handleClose = () => {
  // store.dispatch({
  //   type: 'CLOSE_MENU',
  // })
}

export default firebaseConnect()(SignOutButton);