import { combineReducers } from 'redux';

import { getMaxNumberOfCardsPerHand } from './utils';

const INITIAL_STATE = {
    users: ["Eric", "Karine", "Johanne", "Pierre"],
};

const gameReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_USER_LIST':
            return {
                ...state,
                users: action.payload
            }
        case 'START_GAME':
            const maxNumberOfCardsPerHand = getMaxNumberOfCardsPerHand(state.users.length);
            return {
                ...state,
                hands: Array.from(Array(2 * maxNumberOfCardsPerHand), () => new Array(state.users.length, { bet: null, score: null })),
            }
        default:
            return state
    }
};

export default combineReducers({
    game: gameReducer
});