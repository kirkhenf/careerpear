/*
 * action types
 */

import { getFirestore } from 'redux-firestore';
import { getFirebase } from 'react-redux-firebase';
import { SUCCESFUL_WRITE, ERROR, ADD_QUIZ_RESULTS } from './types'
import _ from 'lodash'
import * as routes from '../constants/routes';

export function addQuizResults(results, history) {
    return function (dispatch) {
        dispatch({ type: ADD_QUIZ_RESULTS });
        var fStorm = getFirestore();
        var fBase = getFirebase();
        fBase.createUser({
            email: results.email,
            password: results.passwordOne
        }, {
                email: results.email,
                firstName: results.firstName,
                lastName: results.lastName,
                role: 'user'
            }).then(() => {
                fBase.auth().onAuthStateChanged(function (user) {
                    if (user) {
                        //add user ID to the call
                        results.uid = user.uid;
                        //push results to the quizResults collection
                        var quizValues = _.omit(results, ['email', 'firstName', 'lastName', 'passwordOne', 'passwordTwo']);
                        fStorm.collection('quizResults').add(quizValues).then((data) => {
                            //dispatch successful write, tell isFetching false
                            dispatch({ type: SUCCESFUL_WRITE, payload: data });
                            history.push(routes.HOME);
                        }).catch((error) => {
                            //dispatch error
                            dispatch({ type: ERROR, error: error });
                        });
                    } else {
                        return "You're not logged in."
                    }

                })

            }).catch((error) => {
                dispatch({ type: ERROR, error: error });
            });
    }
}

// export const fetchToDos = () => async dispatch => {

// };