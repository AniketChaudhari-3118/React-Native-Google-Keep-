
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LoginPage } from './components/LoginPage'
import { DrawerView } from './components/DrawerView'
import { Header } from './components/AddNoteView';
import { AddNote } from './components/AddNoteView';


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

        <Stack.Screen name='DrawerView' component={DrawerView} options={{ headerShown: false }} />

        <Stack.Screen name='AddNote' component={AddNote} options={{
          headerShown: true,
          headerRight: () => <Header />,
          headerTitleStyle: {
            fontSize: 25
          }
        }} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}



export default App;       