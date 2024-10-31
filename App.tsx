
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SigninPage } from './components/SigninPage'
import { LoginPage } from './components/LoginPage'
import { DrawerView } from './components/DrawerView'
import { AddNote } from './components/AddNoteView';
import { SearchNotes } from './components/SearchNotes';


const Stack = createNativeStackNavigator();

function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name='LoginPage' component={LoginPage} options={{
          title: 'Login',
          headerStyle: {
            backgroundColor: 'orange',
          },
          headerTintColor: 'black',
          headerTitleStyle: {
            fontSize: 35,
            color: 'black',
            fontWeight: '800'
          },
          headerTitleAlign: 'center'
        }}
        />

        <Stack.Screen name='Signin' component={SigninPage} options={{
          title: 'Signin',
          headerStyle: {
            backgroundColor: 'orange',
          },
          headerTintColor: 'black',
          headerTitleStyle: {
            fontSize: 35,
            color: 'black',
            fontWeight: '800'
          },
          headerTitleAlign: 'center'
        }}
        />

        <Stack.Screen name='DrawerView' component={DrawerView} options={{ headerShown: false }} />

        <Stack.Screen name='AddNote' component={AddNote} options={{
          headerShown: true,
          // headerLeft: () => <Header />,
          headerTitleStyle: {
            fontSize: 25
          }
        }} />

        <Stack.Screen name='SearchNotes' component={SearchNotes} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>

  );
}



export default App;       