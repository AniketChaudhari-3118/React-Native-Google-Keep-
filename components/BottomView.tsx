
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Tab = createBottomTabNavigator();

//GoogleKeepInterface BottomTab
function BottomTab() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: "#CCCCFF", // Background color of the tab bar
                },
                tabBarShowLabel: false, // Hide the label names
            }}
        >
            <Tab.Screen name='New List' component={NewList} options={{
                headerShown: false,
                tabBarShowLabel: false, // Hide the label names
                tabBarIcon: ({ color, size }) => (
                    <Image
                        source={require('../images/check.png')}
                        style={{
                            width: size,   // width based on the tab icon size
                            height: size,  // height based on the tab icon size
                            tintColor: "black",// Apply the tint color dynamically
                            marginRight: 35,
                        }}
                        resizeMode="contain"  // Contain the image within the defined size
                    />
                ),
            }}></Tab.Screen>

            <Tab.Screen name='New Drawing Note' component={NewDrawingNote} options={{
                headerShown: false,
                tabBarShowLabel: false, // Hide the label names
                tabBarIcon: ({ color, size }) => (
                    <Image
                        source={require('../images/PaintingBrush.png')}
                        style={{
                            width: size,
                            height: size,
                            tintColor: "black",
                            marginRight: 132,
                        }}
                        resizeMode="contain"
                    />
                ),
            }}></Tab.Screen>

            <Tab.Screen name='New Audio Note' component={NewAudioNote} options={{
                headerShown: false,
                tabBarShowLabel: false, // Hide the label names
                tabBarIcon: ({ color, size }) => (
                    <Image
                        source={require('../images/mic.png')}
                        style={{
                            width: size,
                            height: size,
                            tintColor: "black",
                            marginRight: 232,
                        }}
                        resizeMode="contain"
                    />
                ),
            }}></Tab.Screen>

            <Tab.Screen name='New Photo Note' component={NewPhotoNote} options={{
                headerShown: false,
                tabBarShowLabel: false, // Hide the label names
                tabBarIcon: ({ color, size }) => (
                    <Image
                        source={require('../images/gallery.png')}
                        style={{
                            width: size,
                            height: size,
                            tintColor: "black",
                            marginRight: 325,
                        }}
                        resizeMode="contain"
                    />
                ),
            }}></Tab.Screen>

        </Tab.Navigator>
    );
}


const NewList = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 30 }}>New List</Text>
        </View>
    );
}

const NewDrawingNote = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 30 }}>New Drawing Note</Text>
        </View>
    );
}

const NewAudioNote = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 30 }}>New Audio Note</Text>
        </View>
    );
}

const NewPhotoNote = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 30 }}>New Photo Note</Text>
        </View>
    );
}



export default BottomTab;

