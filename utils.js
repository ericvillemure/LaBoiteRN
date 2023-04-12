export const suits = [
    {
        color: 'red',
        symbol: '♥'
    },
    {
        color: 'red',
        symbol: '♦'
    },
    {
        color: 'black',
        symbol: '♣'
    },
    {
        color: 'black',
        symbol: '♠'
    },
    {
        color: 'white',
        symbol: '🛇'
    }
]

export function getDistanceFromMiddle(arr_length, index) {
    // Get the middle indices of the array
    const middleIndex1 = Math.floor((arr_length - 1) / 2);
    const middleIndex2 = middleIndex1 + 1;

    // Calculate the distances from both middle indices to the specified index
    const distance1 = Math.abs(index - middleIndex1);
    const distance2 = Math.abs(index - middleIndex2);

    // Return the smaller of the two distances
    return Math.max(distance1, distance2);
}

export function getMaxNumberOfCardsPerHand(user_count) {
    const cardsCount = 52 + 4;
    const maxNumberOfCardsPerHand = Math.min(Math.floor(cardsCount / user_count), 10)
    return maxNumberOfCardsPerHand;
}
