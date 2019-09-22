import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Typography } from '@material-ui/core';
import { getFirebase } from 'react-redux-firebase';

// File imports
import withAuthorization from './Authentication/withAuthorization';
import { db } from '../firebase';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props };
  }

  async componentDidMount() {
    let currentComponent = this;
    var fBase = getFirebase();
    try {
      fBase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function (idToken) {
        var bearer = 'Bearer ' + idToken;
        fetch('https://us-central1-careerpear-10c55.cloudfunctions.net/getQuizResults', {
          method: 'GET',
          withCredentials: true,
          credentials: 'include',
          headers: {
            'Authorization': bearer,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        })
          .then((response) => {
            return response.json().then((results) => {
              console.log(results);
              currentComponent.setState({ results: results });
            });
          });
      }).catch(function (error) {
        console.log(error)
      });
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