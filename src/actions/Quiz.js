/*
 * action types
 */

import { getFirestore } from 'redux-firestore';

export const addQuizResults = (results) => async dispatch => {
    var fStorm = getFirestore();
    console.log(fStorm);
    fStorm.collection('users').doc().set(results);
    // return "test"
}

// export const fetchToDos = () => async dispatch => {
    
// };