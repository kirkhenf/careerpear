import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Typography } from '@material-ui/core';

// File imports
import withAuthorization from './Authentication/withAuthorization';
import { db } from '../firebase';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
    };
  }

  componentDidMount() {
    
  }

  render() {

    return (
      <div>
        <Typography variant="h1">Home</Typography>
        <p>The Home Page is accessible by every signed in user.</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  
});

const mapDispatchToProps = (dispatch) => ({
  
});

const authCondition = (authUser) => !!authUser;

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
)(HomePage);