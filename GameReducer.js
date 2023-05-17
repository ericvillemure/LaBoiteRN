import { combineReducers } from 'redux';

import { getMaxNumberOfCardsPerHand, handStates } from './utils';

const INITIAL_STATE = {
    users: ["Eric", "Karine", "Johanne", "Pierre"],
    currentHandIndex: -1,
    gameEnded: false
};

const gameReducer = (state = INITIAL_STATE, action) => {
    // console.log(JSON.stringify(state), action);
    switch (action.type) {
        case 'SET_USER_LIST':
            return {
                ...state,
                users: action.payload
            }
        case 'START_GAME':
            const maxNumberOfCardsPerHand = getMaxNumberOfCardsPerHand(state.users.length);
            const numberOfHands = Array(2 * maxNumberOfCardsPerHand);
            return {
                ...state,
                hands: Array.from(numberOfHands, (value, index) => ({
                    state: index === 0 ? handStates.Betting : handStates.NotStarted,
                    usersValues: Array.from(Array(state.users.length), () =>
                    ({
                        bet: undefined,
                        busted: false,
                    }))
                })),
                currentHandIndex: 0,
            }
        case 'SET_BET':
            {
                if (state.hands[state.currentHandIndex].state !== handStates.Betting) {
                    throw new Error('State should be Betting');
                }
                return {
                    ...state,
                    hands: state.hands.map((hand, handIndex) => state.currentHandIndex !== handIndex ? hand :
                        ({
                            ...hand,
                            usersValues: hand.usersValues.map((userValues, userValuesIndex) => action.payload.userIndex !== userValuesIndex ? userValues :
                                ({
                                    ...userValues,
                                    bet: action.payload.bet
                                }))
                        })),
                }
            }
        case 'CONFIRM_BETS':
            {
                if (state.hands[state.currentHandIndex].state !== handStates.Betting) {
                    throw new Error('State should be Betting');
                }
                return {
                    ...state,
                    hands: state.hands.map((hand, handIndex) => state.currentHandIndex !== handIndex ? hand :
                        ({
                            ...hand,
                            state: handStates.Playing
                        }))
                }
            }
        case 'SET_BUSTED':
            {
                if (state.hands[state.currentHandIndex].state !== handStates.Playing) {
                    throw new Error('State should be Playing');
                }
                return {
                    ...state,
                    hands: state.hands.map((hand, handIndex) => state.currentHandIndex !== handIndex ? hand :
                        ({
                            ...hand,
                            usersValues: hand.usersValues.map((userValues, userValuesIndex) => action.payload.userIndex !== userValuesIndex ? userValues :
                                ({
                                    ...userValues,
                                    busted: action.payload.busted
                                }))
                        })),
                }
            }
        case 'END_HAND':
            {
                if (state.hands[state.currentHandIndex].state !== handStates.Playing) {
                    throw new Error('State should be Playing');
                }
                const maxNumberOfCardsPerHand = getMaxNumberOfCardsPerHand(state.users.length);
                const numberOfHands = Array(2 * maxNumberOfCardsPerHand);
                const gameEnded = state.currentHandIndex === numberOfHands - 1;
                const currentHandIndex = gameEnded ? -1 : state.currentHandIndex + 1;
                return {
                    ...state,
                    hands: state.hands.map((hand, index) => {
                        if (gameEnded && index === state.currentHandIndex) {
                            return {
                                ...hand,
                                state: handStates.Done
                            }
                        } else if (!gameEnded && index === currentHandIndex) {
                            return {
                                ...hand,
                                state: handStates.Betting
                            }
                        }
                        return hand;
                    }),
                    currentHandIndex,
                    gameEnded
            }
    }
        default:
return state
    }
};

export default combineReducers({
    game: gameReducer
});