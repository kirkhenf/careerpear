import { combineReducers } from 'redux';
import sessionReducer from './session';
import userReducer from './user';
import navigationReducer from './navigation';
import { reducer as formReducer } from 'redux-form'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore' 

const rootReducer = combineReducers({
  sessionState: sessionReducer,
  userState: userReducer,
  navigation: navigationReducer,
  form: formReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

export default rootReducer;