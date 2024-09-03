
import { TextInput } from 'react-native-paper'
import { Image, Pressable, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { useState } from 'react';
import { styles } from './GoogleKeepLoginCss'

export const LoginPage = (props : any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

        <Pressable style={styles.login} onPress={() => props.navigation.navigate('DrawerView')}>
          <Text style={styles.text_login} >login</Text>
        </Pressable>

        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.login_With}>Login with:</Text>
          <View style={{ flexDirection: 'row', marginTop: 17 }}>
            <View style={{ height: 20, padding: 2 }}><Image source={require('../images/FacebookImage.png')} style={styles.image} /></View>
            <View style={{ height: 20, padding: 2 }}><Image source={require('../images/icons8-gmail-logo-48.png')} style={styles.image} /></View>
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

