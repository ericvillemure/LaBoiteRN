import uuid from 'react-native-uuid';
import { combineReducers } from 'redux';

import { getMaxNumberOfCardsPerHand, handStates } from './utils';

const INITIAL_STATE = {
    users: ["Eric", "Karine", "Johanne", "Pierre"].map(user => ({ name: user, id: uuid.v4() })),
    currentHandIndex: -1,
    gameEnded: false
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
            const numberOfHands = 2 * maxNumberOfCardsPerHand;
            return {
                ...state,
                hands: Array.from(Array(numberOfHands), (_value, index) => ({
                    id: uuid.v4(),
                    state: index === 0 ? handStates.Betting : handStates.NotStarted,
                    usersValues: Array.from(Array(state.users.length), () =>
                    ({
                        bet: undefined,
                        busted: false,
                    }))
                })),
                currentHandIndex: 0,
                gameEnded: false
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
                const numberOfHands = 2 * maxNumberOfCardsPerHand;
                const gameEnded = state.currentHandIndex === numberOfHands - 1;
                const currentHandIndex = Math.min(numberOfHands - 1, state.currentHandIndex + 1);
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