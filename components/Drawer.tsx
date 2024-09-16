import React from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer'
import { GoogleKeepInterface } from './GoogleKeepInterface';

const Drawer = createDrawerNavigator();

export default function Drawer1() {
  return (
    <Drawer.Navigator initialRouteName='GoogleKeepInterface'>
      <Drawer.Screen name="Keep" component={GoogleKeepInterface} options={{
        headerShown: false,
        drawerIcon: () => (
          <Image
            source={require('../images/Google.png')} 
            style={{ width: 90, height: "300%" }}
            resizeMode= "center"
          />

        ),
      }} />
      <Drawer.Screen name="Notes" component={Notes} options={{
        headerTitleStyle: {
          fontSize: 30
        },
        drawerIcon: ({ color, size }) => (
          <Image
            source={require('../images/bulb.png')}
            style={{ width: 25, height: 25, tintColor: color }}
            resizeMode="contain"
          />
        ),
      }} />
      <Drawer.Screen name="Remainders" component={Remainders} options={{
        headerTitleStyle: {
          fontSize: 30
        },
        drawerIcon: ({ color, size }) => (
          <Image
            source={require('../images/bell.png')}
            style={{ width: 25, height: 25, tintColor: color }}
            resizeMode="contain"
          />
        ),
      }} />
      <Drawer.Screen name="CreateNewLabel" component={CreateNewLabel} options={{
        headerTitleStyle: {
          fontSize: 30
        },
        drawerIcon: ({ color, size }) => (
          <Image
            source={require('../images/plus.png')}
            style={{ width: 25, height: 25, tintColor: color }}
            resizeMode="contain"
          />
        ),
      }} />
      <Drawer.Screen name="Archive" component={Archive} options={{
        headerTitleStyle: {
          fontSize: 30
        },
        drawerIcon: ({ color, size }) => (
          <Image
            source={require('../images/archive.png')}
            style={{ width: 25, height: 25, tintColor: color }}
            resizeMode="contain"
          />
        ),
      }} />
      <Drawer.Screen name="Trash" component={Trash} options={{
        headerTitleStyle: {
          fontSize: 30
        },
        drawerIcon: ({ color, size }) => (
          <Image
            source={require('../images/trash.png')}
            style={{ width: 25, height: 25, tintColor: color }}
            resizeMode="contain"
          />
        ),
      }} />
      <Drawer.Screen name="Settings" component={Settings} options={{
        headerTitleStyle: {
          fontSize: 30
        },
        drawerIcon: ({ color, size }) => (
          <Image
            source={require('../images/settings.png')}
            style={{ width: 25, height: 25, tintColor: color }}
            resizeMode="contain"
          />
        ),
      }} />
      <Drawer.Screen name="Help & feedback" component={Help_Feedback} options={{
        headerTitleStyle: {
          fontSize: 30
        },
        drawerIcon: ({ color, size }) => (
          <Image
            source={require('../images/Help.png')}
            style={{ width: 25, height: 25, tintColor: color }}
            resizeMode="contain"
          />
        ),
      }} />
    </Drawer.Navigator>
  );
}


const Notes = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 30 }}>Login</Text>
    </View>
  );
}

const Remainders = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 30 }}>SignUp</Text>
    </View>
  );
}

const CreateNewLabel = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 30 }}>Other</Text>
    </View>
  );
}

const Archive = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 30 }}>Archive</Text>
    </View>
  );
}
const Trash = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 30 }}>Settings</Text>
    </View>
  );
}
const Settings = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 30 }}>Settings</Text>
    </View>
  );
}
const Help_Feedback = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 30 }}>Settings</Text>
    </View>
  );
}


