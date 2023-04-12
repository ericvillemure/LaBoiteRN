import { combineReducers } from 'redux';

const INITIAL_STATE = {
    users: [],
};

const gameReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_USER_LIST':
            console.log(state, action)
            return {
                ...state,
                users: action.payload
            }
        default:
            return state
    }
};

export default combineReducers({
    game: gameReducer
});