import { combineReducers } from 'redux';
import sessionReducer from './session';
import userReducer from './user';
import navigationReducer from './navigation';
import quizReducer from './quiz';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
  sessionState: sessionReducer,
  userState: userReducer,
  navigation: navigationReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  quiz: quizReducer
});

export default rootReducer;