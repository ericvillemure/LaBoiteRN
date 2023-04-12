import { StyleSheet } from 'react-native';
/* Colors
https://colorhunt.co/palette/ecf9fffffbebffe7ccf8cba6
#ECF9FF
#FFFBEB
#FFE7CC
#F8CBA6

 */

export const homeStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFBEB',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export const createStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ECF9FF',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 40,
        paddingBottom: 40
    },
    data: {
        fontSize: 20
    }
});

export const bettingStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFBEB',
        alignItems: 'center',
        justifyContent: 'center',
    },
    suitContainer: {
        fontSize: 200
    }
});

export const playingHandStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFBEB',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
