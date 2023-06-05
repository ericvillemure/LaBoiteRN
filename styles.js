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
        flexDirection: 'column',
        backgroundColor: '#FFFBEB',
        // backgroundColor: 'green',
        alignItems: 'stretch',
        justifyContent: 'center',

    },
    topContainer: {
        alignItems: 'center',
    },
    topContainerSuit: {
    },
    topContainerInfo: {
        alignSelf: "flex-end",
        // transform:"translate(0px,-24px)",
        margin: 5,
        marginTop: -32,

    },
    topContainerInfoText: {
        fontSize: 24,
    },
    suitText: {
        fontSize: 200,
        includeFontPadding: false,
        textAlignVertical: "center"
    },
    betsView: {
        // width: "100%",
        backgroundColor: "#F8CBA6",
        // backgroundColor: "red",
        // padding: 2,
        borderRadius: 10,
        // borderColor: "green",
        margin: 4
    },
    bottomContainer: {
        flexDirection: 'row',
    },
    betView: {
        flexDirection: 'row',
        // margin: 5,
        // marginLeft: 0,
        alignItems: "center",
        // backgroundColor: "blue",

        // margin:5
        // padding:5
    },
    betDealerIconView: {
        width: 24,
        margin: 2
    },
    betDealerIconText: {
        fontSize: 20,
    },
    betPlayerNameView: {
        flex: 1,
        padding: 5
    },
    betPlayerNameText: {
        fontSize: 24,
    },
    betButtonsView: {
        // flex: 1,
        // flexDirection: 'row',

        //flexWrap: 'wrap',
    },
    betInputView: {
        flex: 1,
        // backgroundColor: "green",
        // borderColor:"white"
        margin: 5
    },
    betInput: {


        fontSize: 20,
        borderWidth: 1,
        borderRadius: 3,
        padding: 3
    },
    betBetTextView: {
        flex: 1,
    },
    betBetText: {
        fontSize: 24,
    },
    betBetCheckboxView: {
        flexDirection: "row",
        alignItems: "center",
        // backgroundColor:"blue"
        // margin:5
    },
    betBetCheckboxIcon: {
        fontSize: 22,
        // backgroundColor:"red"
    },
    betButtonView: {
        padding: 10,
        fontSize: 32
        // Width in percentage does not work with ScrollView's horizontal scroll on Android
        // width: "33%",
        // flexBasis: '18%',
        // width: "20em"
    },
    betButton: {
        width: "33%",
        backgroundColor: "red",
        borderRadius: 4,
        fontSize: 30,
        borderWidth: 1,
        margin: 20,

    }
});

export const summaryStyles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: '#FFFBEB',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    userRow: {
        flex: 1
    },
    userNameText: {
        fontSize:24
    }
});
