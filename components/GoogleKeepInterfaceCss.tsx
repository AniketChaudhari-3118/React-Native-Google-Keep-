import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    main: {
        flex: 1,
        padding: 1,
    },
    drawer: {
        height: 45,
        width: 45,
        marginTop: 21,
        marginRight: 65,
        marginLeft: 12
    },
    keep: {
        fontSize: 31,
        marginTop: 21,
        marginRight: 15,
        marginLeft: 10,
        fontWeight: '600'
    },
    image: {
        height: 30,
        width: 35,
        justifyContent: 'flex-start',
    },
    upperBar: {
        flexDirection: 'row',
        height: 85,
        backgroundColor: '#fff',
        shadowColor: 'black',
        elevation: 6,
        padding: 5,
        borderBottomColor: 'grey',
    },
    searchIcon: {
        height: 38,
        width: 38,
        margin: 15,
        marginRight: 5,
        marginLeft: 10,
        marginTop: 25
    },
    refreshIcon: {
        height: 38,
        width: 38,
        margin: 15,
        marginRight: 10,
        marginTop: 25
    }
});
