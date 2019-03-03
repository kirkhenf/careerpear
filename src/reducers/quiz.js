import {
    ADD_QUIZ_RESULTS,
    ERROR,
    SUCCESFUL_WRITE
} from '../actions/types'

const initialState = {
    isFetching: false,
    results: ''
}

function quizReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_QUIZ_RESULTS: {
            return Object.assign({}, state, {
                isFetching: true
            })
        }
        case ERROR:
            return {
                ...state,
                isFetching: false,
                error: action.error
            }
        case SUCCESFUL_WRITE:
            return Object.assign({}, state, {
                ...state,
                isFetching: false,
                results: action.payload
            })
        default:
            return state;
    }
}

export default quizReducer;