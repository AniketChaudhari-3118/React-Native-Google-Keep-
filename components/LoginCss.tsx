import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  main: {
    flex: 1
  },
  loginView: {
    marginTop: "8%"
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
    marginTop: "1.5%"
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
    marginTop: "5%",
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
    fontSize: 20,
    padding: 3,
    fontWeight: '500',
    marginTop: 25,
    marginLeft: "8%"
  },
  image: {
    height: "160%",
    width: 35,
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
  },
  enterPhoneNumber: {
    backgroundColor: 'white',
    width: "63.5%",
    alignSelf: 'center',
    borderCurve: 'circular',
    borderRadius: 10,
    borderColor: 'grey',
    marginTop: "1%"
  },
  sendCode: {
    marginTop: "2%",
    textAlign: 'center'
  }

})