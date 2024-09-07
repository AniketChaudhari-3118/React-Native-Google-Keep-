
import { TextInput } from 'react-native-paper'
import { Image, Pressable, Text, TouchableHighlight, View } from 'react-native';
import { useState } from 'react';
import { styles } from './SigninCss'
import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
    webClientId: 'YOUR_WEB_CLIENT_ID', // From Firebase Console
    offlineAccess: false,
});

const signInWithGoogle = async () => {
    try {
        // Get the user's ID token and access token
        const { idToken }: any = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        await auth().signInWithCredential(googleCredential);

        console.log('User signed in with Google!');
    } finally {
        console.warn("Sorry");
    }
}

export const SigninPage = (props: any) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const onSignin = () => {
        auth().createUserWithEmailAndPassword(email, password).then(() => {
            props.navigation.navigate('LoginPage');
        }).catch((error) => {
            console.log(error);
        })
    }
    return (


        <View style={styles.main}>

            <View style={styles.Signin_View}>
                <Text style={styles.Heading}>First Name</Text>
                <TextInput style={styles.enterData} label="email / username" value={email}
                    onChangeText={text => setEmail(text)}
                    mode='outlined'
                    underlineColor="transparent" placeholder='Enter Email' />

                <Text style={styles.Heading}>Last Name</Text>
                <TextInput style={styles.enterData} label="Password" // Floating label
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry // Hide password input
                    mode="outlined" />

                <Text style={styles.Heading}>Email</Text>
                <TextInput style={styles.enterData} label="email / username" value={email}
                    onChangeText={text => setEmail(text)}
                    mode='outlined'
                    underlineColor="transparent" placeholder='Enter Email' />

                <Text style={styles.Heading}>Password</Text>
                <TextInput style={styles.enterData} label="Password" // Floating label
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry // Hide password input
                    mode="outlined" />

                <Text style={styles.Heading}>Confirm Password</Text>
                <TextInput style={styles.enterData} label="Password" // Floating label
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry // Hide password input
                    mode="outlined" />

                <Pressable style={styles.Signin} onPress={() => onSignin()}>
                    <Text style={styles.text_Signin} >Signin</Text>
                </Pressable>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.Signin_With}>Signin with:</Text>
                    <View style={{ flexDirection: 'row', marginTop: 17 }}>
                        <Pressable onPress={() => signInWithGoogle()}><Image source={require('../images/icons8-google-plus-50.png')} style={styles.image} /></Pressable>
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

