import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  main: {
    flex: 1
  },
  loginView: {
    marginTop: 125
  },
  email: {
    fontSize: 22,
    padding: 6,
    marginLeft: 68
  },
  password: {
    fontSize: 22,
    padding: 6,
    marginLeft: 68,
    marginTop: 10
  },
  enterEmail: {
    backgroundColor: 'white',
    width: 250,
    alignSelf: 'center',
    borderCurve: 'circular',
    borderRadius: 10,
    borderColor: 'grey',
  },
  login: {
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
    marginTop: 10
  },
  login_With: {
    fontSize: 22,
    padding: 3,
    fontWeight: '500',
    marginTop: 25,
    marginLeft: 125
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
    borderRadius: 2,
    padding: 3,
    backgroundColor: 'lightgrey'
  }

})