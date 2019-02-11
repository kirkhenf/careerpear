import { createStore, compose } from 'redux';
import rootReducer from '../reducers';
import firebase from 'firebase'
import { reactReduxFirebase } from 'react-redux-firebase'
import { reduxFirestore } from 'redux-firestore' // <- needed if using firestore


// react-redux-firebase options
const config = {
  userProfile: 'users', // firebase root where user profiles are stored
  enableLogging: false, // enable/disable Firebase's database logging
  // useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
  profileParamsToPopulate: [
    { child: 'roles', root: 'roles' }, // populates user's role with matching role object from roles
  ],
  firebaseStateName: 'firebase', // should match the reducer name ('firebase' is default)
  profileFactory: (userData, profile) => { // how profiles are stored in database
    const { user } = userData;
    return {
      uid: user.uid,
      email: user.email,
      first_name: profile.first_name,
      last_name: profile.last_name
    };
  }
}

// need to initialize dates as timestamps
const firestore = firebase.firestore();
firebase.firestore() // <- needed if using firestore

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, config), // firebase instance as first argument
  reduxFirestore(firebase) // <- needed if using firestore
)(createStore)

const store = createStoreWithFirebase(rootReducer);

export default store;