/*
 * action types
 */

import { getFirestore } from 'redux-firestore';
import { getFirebase } from 'react-redux-firebase';
import { SUCCESFUL_WRITE, ERROR, ADD_QUIZ_RESULTS } from './types'

export function addQuizResults(results) {
    return function (dispatch) {
        dispatch({type: ADD_QUIZ_RESULTS});
        var fStorm = getFirestore();
        var fBase = getFirebase();
        fBase.auth().onAuthStateChanged(function (user) {
            if (user) {
                //add user ID to the call
                results.uid = user.uid;
                //push results to the quizResults collection
                fStorm.collection('quizResults').add(results).then((data) => {
                    //dispatch successful write, tell isFetching false
                    dispatch({type: SUCCESFUL_WRITE, payload: data});
                }).catch((error) => {
                    //dispatch error
                    dispatch({type: ERROR, error: error});
                });
            } else {
                return "You're not logged in."
            }
        });
    }
}

// export const fetchToDos = () => async dispatch => {

// };