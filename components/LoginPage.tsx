
import { TextInput } from 'react-native-paper'
import { Image, Pressable, Text, TouchableHighlight, View, Appearance } from 'react-native';
import { useState } from 'react';
import { styles } from './LoginCss'
import auth from '@react-native-firebase/auth'
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import React from 'react';


export const LoginPage = (props: any) => {

  const [theme, setTheme] = useState(Appearance.getColorScheme());
  Appearance.addChangeListener((scheme => {
    setTheme(scheme.colorScheme);
  }))

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationId, setVerifactionId] = useState("");
  const [verificationCode, setVerificationCode] = useState('');
  const [message, setMessage] = useState("");


  const onLogin = async () => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      props.navigation.navigate('DrawerView')
    } catch (error) {
      console.error('Error Loging in:', error);
    }
  }

  const sendVerifactionCode = async () => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      console.log("Hello");
      if (confirmation.verificationId)
        setVerifactionId(confirmation.verificationId);
      setMessage('Verification code sent')
    } catch (error) {
      setMessage(`Error: ${error}`);
    }
  }

  const confirmCode = async () => {
    try {
      const credential = auth.PhoneAuthProvider.credential(verificationId, verificationCode)
      await auth().signInWithCredential(credential);
      setMessage('Phone authentication successfull');
    } catch (error) {
      setMessage(`Error: ${error}`);
    }
  }
  // style={theme === "dark" ? styles.darkTheme : styles.lightTheme}
  return (
    <GestureHandlerRootView>
      <View style={styles.main}>

        <View style={styles.loginView}>
          <Text style={styles.email}>Email or Username</Text>
          <TextInput style={styles.enterEmail} label="email / username" value={email}
            onChangeText={text => setEmail(text)}
            mode='outlined'
            underlineColor="transparent" placeholder='Enter Email' />

          <Text style={styles.password}>Password</Text>
          <TextInput style={styles.enterEmail} label="Password" // Floating label
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry // Hide password input
            mode="outlined" />

          <Pressable style={styles.login} onPress={() => onLogin()}>
            <Text style={styles.text_login} >login</Text>
          </Pressable>

          <Pressable style={styles.text_Signin} onPress={() => props.navigation.navigate("Signin")}>
            <Text style={styles.text_login} >Signin</Text>
          </Pressable>

          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.login_With}>Login with:</Text>
            <View style={{ flexDirection: 'row', marginTop: 17 }}>
              <View style={{ height: 20, padding: 2, marginRight: "5%" }}><Image source={require('../images/icons8-google-plus-50.png')} style={styles.image} /></View>
            </View>
            <Text style={{ fontSize: 20, marginTop: "7.5%", fontWeight: '500' }}>OR   PhoneNumber</Text>
          </View>

          {/*Login with PhoneNumber*/}
          <View>
            <TextInput style={styles.enterPhoneNumber} mode='outlined'
              underlineColor="transparent" placeholder='Enter PhoneNumber' keyboardType='number-pad'
              value={phoneNumber} onChangeText={text => setPhoneNumber(text)} label="PhoneNumber" />

            <TouchableOpacity style={styles.sendCode} onPress={sendVerifactionCode}>
              <Text style={styles.text_login}> Send Verification Code</Text>
            </TouchableOpacity>

            {
              verificationId ? (
                <>
                  <TextInput
                    style={styles.enterPhoneNumber}
                    placeholder='Verification Code'
                    value={verificationCode}
                    onChangeText={setVerificationCode}
                    keyboardType='number-pad'
                    label="Verification Code"
                    mode='outlined'
                    underlineColor="transparent"
                  />

                  <TouchableOpacity style={styles.sendCode} onPress={confirmCode}>
                    <Text style={styles.text_login}>Confirm Code</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <Text style={{ textAlign: 'center' }}>{message}</Text>
              )
            }

          </View>

        </View>

      </View>
    </GestureHandlerRootView>

  )
}

