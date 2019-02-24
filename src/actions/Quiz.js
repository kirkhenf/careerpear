/*
 * action types
 */

import { getFirestore } from 'redux-firestore';
import { getFirebase } from 'react-redux-firebase';

export const addQuizResults = (results) => async dispatch => {
    var fStorm = getFirestore();
    var fBase = getFirebase();
    fBase.auth().onAuthStateChanged(function (user) {
        if (user) {
            fStorm.collection('users').doc(user.uid).set(results);
        } else {
            console.log("No user logged in.")
        }
    });
    
    // return "test"
}

// export const fetchToDos = () => async dispatch => {

// };