import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  main: {
    flex: 1
  },
  loginView: {
    marginTop: "28%"
  },
  email: {
    fontSize: 22,
    padding: 6,
    marginLeft: "16.5%"
  },
  password: {
    fontSize: 22,
    padding: 6,
    marginLeft: "16.5%",
    marginTop: "3%"
  },
  enterEmail: {
    backgroundColor: 'white',
    width: "63.5%",
    alignSelf: 'center',
    borderCurve: 'circular',
    borderRadius: 10,
    borderColor: 'grey',
  },
  login: {
    borderColor: 'skyblue',
    borderWidth: 1,
    marginLeft: "18.5%",
    marginRight:"18.5%",
    marginTop: "8%",
    backgroundColor: 'lightblue',
    height: "8%",
    shadowColor: 'grey',
    elevation: 5
  },
  text_login: {
    textAlign: 'center',
    fontSize: 20,
    padding: 3,
    fontWeight: '500'
  },
  text_Signin: {
    textAlign: 'center',
    fontSize: 20,
    padding: 3,
    fontWeight: '500',
    marginTop: "3%"
  },
  login_With: {
    fontSize: 22,
    padding: 3,
    fontWeight: '500',
    marginTop: 25,
    marginLeft: "31%"
  },
  image: {
    height: "180%",
    width: 38,
    marginTop: "23%"
  },
  termsView: {
    flexDirection: 'row',
    marginLeft: "31.5%",
    marginTop: "8%"
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
    borderRadius: 2,
    padding: 3,
    backgroundColor: 'lightgrey'
  }

})