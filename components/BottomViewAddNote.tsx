
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Tab = createBottomTabNavigator();

//AddNote Inteface BottomTab
function BottomTab() {

    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const updateCurrentTime = () => {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0'); // Get hours in 24-hour format
            const minutes = String(now.getMinutes()).padStart(2, '0'); // Get minutes
            setCurrentTime(`${hours}:${minutes}`); // Format time as HH:MM
        };

        updateCurrentTime(); // Initialize with the current time
        const timer = setInterval(updateCurrentTime, 1000); // Update every minute

        return () => clearInterval(timer); // Clean up the timer when the component unmounts
    }, []);

    return (
        <Tab.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '"aliceblue"'
            },
        }}>

            <Tab.Screen name='New List' component={NewList} options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <Image
                        source={require('../images/PlusInBoxAddNote.png')}
                        style={{
                            width: size,   // width based on the tab icon size
                            height: size,  // height based on the tab icon size
                            tintColor: "black",// Apply the tint color dynamically
                            marginRight: 0
                        }}
                        resizeMode="contain"  // Contain the image within the defined size
                    />
                ),
            }}></Tab.Screen>

            <Tab.Screen name='New Drawing Note' component={NewDrawingNote} options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <Image
                        source={require('../images/PaintColorPlate.png')}
                        style={{
                            width: size,   // width based on the tab icon size
                            height: size,  // height based on the tab icon size
                            tintColor: "black", // Apply the tint color dynamically
                            marginRight: 30

                        }}
                        resizeMode="contain"  // Contain the image within the defined size
                    />
                ),
            }}></Tab.Screen>

            <Tab.Screen name='New Audio Note' component={NewAudioNote} options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <Image
                        source={require('../images/FontChangeAddNote.png')}
                        style={{
                            width: size,   // width based on the tab icon size
                            height: size,  // height based on the tab icon size
                            tintColor: "black", // Apply the tint color dynamically
                            marginRight: 60

                        }}
                        resizeMode="contain"  // Contain the image within the defined size
                    />
                ),
            }}></Tab.Screen>

            <Tab.Screen name='New Photo Note' component={NewPhotoNote} options={{
                headerShown: false,
                tabBarLabel: ({ focused, color }) => (
                    <Text style={{ fontSize: 17, marginBottom: 18, marginLeft: 0, width: 150 }}>
                        Edited {currentTime} PM
                    </Text>
                ),
            }}>
            </Tab.Screen>

            <Tab.Screen name='Menu' component={MenuAddNote} options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <Image
                        source={require('../images/3DotMenuAddNote.png')}
                        style={{
                            width: size,   // width based on the tab icon size
                            height: size,  // height based on the tab icon size
                            tintColor: "black", // Apply the tint color dynamically
                            marginLeft: 30

                        }}
                        resizeMode="contain"  // Contain the image within the defined size
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


const MenuAddNote = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 30 }}>New List</Text>
        </View>
    );
}

export default BottomTab;

