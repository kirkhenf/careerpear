import {
    ADD_QUIZ_RESULTS,
    // READ_QUIZ_RESULTS
} from '../actions/types'

const initialState = {
    results: ''
}

function quizResults(state = initialState, action) {
    switch (action.type) {
        case ADD_QUIZ_RESULTS:
            return action.payload;
        // case READ_QUIZ_RESULTS:
        //     return action.payload;
        default:
            return state;
    }
}