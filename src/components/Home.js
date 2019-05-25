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

    this.state = {...props};
  }

  async componentDidMount() {
    console.log(this.state);
    try {
      const response = await fetch(`https://us-central1-careerpear-10c55.cloudfunctions.net/results?id=`+ this.state.authUser.uid);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const json = await response.json();
      this.setState({ results: json });
    } catch (error) {
      console.log(error);
    }
  }

  render() {

    return (
      <div>
        <Typography variant="h1">Home</Typography>
        <p>{JSON.stringify(this.state.results)}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser
});

const mapDispatchToProps = (dispatch) => ({
  
});

const authCondition = (authUser) => !!authUser;

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
)(HomePage);