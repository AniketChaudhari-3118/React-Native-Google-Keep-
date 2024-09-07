import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    main: {
        flex: 1
    },
    Signin_View: {
        marginTop: 25
    },
    Heading: {
        fontSize: 18,
        padding: 3,
        marginLeft: 68,
        marginTop: 5
    },
    enterData: {
        height: 40,
        backgroundColor: 'white',
        width: 250,
        alignSelf: 'center',
        shadowColor: 'black',
        borderCurve: 'circular',
        borderRadius: 10,
        borderColor: 'grey',

    },
    Signin: {
        borderColor: 'skyblue',
        borderWidth: 1,
        marginLeft: 72,
        marginRight: 72,
        marginTop: 30,
        backgroundColor: 'lightblue',
        height: 35,
        shadowColor: 'grey',
        elevation: 5
    },
    text_Signin: {
        textAlign: 'center',
        fontSize: 20,
        padding: 3,
        fontWeight: '500'
    },
    Signin_With: {
        fontSize: 22,
        padding: 3,
        fontWeight: '500',
        marginTop: 25,
        marginLeft: 123
    },
    image: {
        height: 30,
        width: 38,
        marginTop: 8
    },
    termsView: {
        flexDirection: 'row',
        marginLeft: 125,
        marginTop: 30
    },
    terms: {
        fontSize: 16
    },
    btn2: {
        borderColor: 'lightgrey',
        borderWidth: 1,
        shadowColor: 'grey',
        elevation: 1,
        borderCurve: 'circular',
        borderRadius: 5,
        padding: 3,
        backgroundColor: 'lightgrey'
    }

})