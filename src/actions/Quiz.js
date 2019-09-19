/*
 * action types
 */

import { getFirestore } from 'redux-firestore';
import { getFirebase } from 'react-redux-firebase';
import { SUCCESFUL_WRITE, ERROR, ADD_QUIZ_RESULTS } from './types'
import _ from 'lodash'
import * as routes from '../constants/routes';

export function addQuizResults(results, history, brain) {
    return function (dispatch) {
        dispatch({ type: ADD_QUIZ_RESULTS });
        var fStore = getFirestore();
        var fBase = getFirebase();
        var quizResults = [];
        var quizResultsInstance;
        quizResultsInstance = _.omit(results, ['email', 'firstName', 'lastName', 'passwordOne']);
        quizResultsInstance.created = fStore.Timestamp.fromDate(new Date());
        quizResults.push(quizResultsInstance);

        fBase.createUser({
            email: results.email,
            password: results.passwordOne
        }, {
                email: results.email,
                firstName: results.firstName,
                lastName: results.lastName,
                quizResults: quizResults,
                role: 'user'
            })
            .then(() => {
                fBase.auth().onAuthStateChanged(function (user) {
                    if (user) {
                        //add user ID to the call
                        results.uid = user.uid;
                        results.created = fStore.Timestamp.fromDate(new Date());
                        results.updated = results.created;
                        if (brain == 0) generateLogicalTraits(user, results);
                        else generateCreativePersona(user, results);

                        var quizValues = _.omit(results, ['email', 'firstName', 'lastName', 'passwordOne']);
                        fStore.collection('quizResults').add(quizValues).then((data) => {
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

            })
            .catch((error) => {
                dispatch({ type: ERROR, error: error });
            });
    }
}

export function getQuizResults() {

}

export function generateCreativePersona(user, values) {
    var rawResults = _.omit(values, ['email', 'firstName', 'created', 'lastName', 'passwordOne', 'uid', 'updated']);
    var creativeResults = [];
    Object.keys(rawResults).map(function (key) {
        creativeResults.push({
            questionId: key,
            personaId: rawResults[key]
        })
    });

    console.log(creativeResults);

    //get token and make fetch
    var fBase = getFirebase();
    fBase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function (idToken) {
        console.log(idToken);
        console.log(creativeResults);
        var bearer = 'Bearer ' + idToken;
        fetch('https://us-central1-careerpear-10c55.cloudfunctions.net/generateCreativePersona', {
            method: 'POST',
            withCredentials: true,
            credentials: 'include',
            headers: {
                'Authorization': bearer,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(creativeResults)
        })
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson);
            }).catch(function (error) {
                console.log(error);
            })
    }).catch(function (error) {
        console.log(error)
    });

}

export function generateLogicalTraits(user, values) {
    console.log(values);
    var rawResults = _.omit(values, ['email', 'firstName', 'created', 'lastName', 'passwordOne', 'uid', 'updated']);
    var logicalResults = [];
    console.log(rawResults);
    Object.keys(rawResults).map(function (key) {
        var obj = JSON.parse(rawResults[key]);
        logicalResults.push({
            questionId: key,
            traitId: obj.traitId, //need to populate
            weight: obj.weight, //need to populate
        })
    });

    console.log(logicalResults);

    //get token and make fetch
    var fBase = getFirebase();
    fBase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function (idToken) {
        var bearer = 'Bearer ' + idToken;
        fetch('https://us-central1-careerpear-10c55.cloudfunctions.net/generateLogicalTraits', {
            method: 'POST',
            withCredentials: true,
            credentials: 'include',
            headers: {
                'Authorization': bearer,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(logicalResults)
        })
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson);
            })
    }).catch(function (error) {
        console.log(error)
    });
}