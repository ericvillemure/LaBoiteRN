export const setUserList = list => (
    {
        type: 'SET_USER_LIST',
        payload: list,
    }
);

export const startGame = () => (
    {
        type: 'START_GAME',
    }
);

export const confirmBets = () => (
    {
        type: 'CONFIRM_BETS',
    }
);

export const endHand = () => (
    {
        type: 'END_HAND',
    }
);


export const setBet = (userIndex, bet) => (
    {
        type: 'SET_BET',
        payload: {
            userIndex,
            bet
        }
    }
);
export const setBusted = (userIndex, busted) => (
    {
        type: 'SET_BUSTED',
        payload: {
            userIndex,
            busted
        }
    }
);
