
import { TextInput } from 'react-native-paper'
import { Image, Pressable, Text, TouchableHighlight, View } from 'react-native';
import { useState } from 'react';
import { styles } from './LoginCss'
import auth from '@react-native-firebase/auth'


export const LoginPage = (props: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = () => {
    auth().signInWithEmailAndPassword("shantanu256@gmail.com", "shantanu@256").then(() => {
      props.navigation.navigate('DrawerView');
      
    }).catch((error) => {
      console.log(error);
    })
  }
  return (


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
            <View style={{ height: 20, padding: 2 }}><Image source={require('../images/icons8-google-plus-50.png')} style={styles.image} /></View>
          </View>
        </View>
      </View>

      <View style={styles.termsView}>
        <TouchableHighlight style={styles.btn2}>
          <Text style={styles.terms}>Terms & Conditions</Text>
        </TouchableHighlight>

      </View>

    </View>
  )
}

