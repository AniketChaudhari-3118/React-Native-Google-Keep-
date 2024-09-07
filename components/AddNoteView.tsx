
import { Image, Pressable, Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import BottomViewAddNote from "./BottomViewAddNote";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNotesData } from "../ReduxGoogleKeep/action_GoogleKeep";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';  
import {SendData} from './SqlDatabaseConnection'


export function AddNote() {

    const [notesDataFirebase, setNotesDataFirebase] = useState({ title: "", notes: "" });
    const [notesData, setNotesData] = useState({ title: "", notes: "", isPinned: false });
    const dispatch = useDispatch();

    const handleInputChange = (name: string, value: string) => {
        setNotesDataFirebase((prev) => ({
            ...prev,
            [name]: value,
        }));
    
        setNotesData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        if (notesData.title.trim() !== "" || notesData.notes.trim() !== "") {
            dispatch(addNotesData(notesData));
            setNotesData({ title: "", notes: "", isPinned: false }); // Reset the form after submission
            addNoteToFirestore(notesDataFirebase.title, notesDataFirebase.notes);
        } else {
            console.warn("Note is empty, not submitting.");
        }
    };


    const addNoteToFirestore = async (title: string, description: string) => {
        console.warn(title, description);
        try {
            const user = auth().currentUser;  // Get the currently authenticated user
    
            if (user) {  // Check if the user is authenticated
                await firestore()
                    .collection('Notes Data')  // Choose the collection name, e.g., 'Notes'
                    .add({
                        title: title,
                        description: description,
                        userId: user.uid,  // Save the user ID for reference
                        createdAt: firestore.FieldValue.serverTimestamp(), // To store the time of creation
                    });
                console.log('Note added!');
            } else {
                console.warn('No user is signed in.');
            }
        } catch (error) {
            console.error("Error adding note: ", error);
        }
    };
    


    return (
        <View>

            {/*TextInput for Title*/}
            <TextInput
                value={notesData.title}
                style={{ margin: 10, fontSize: 20, borderRadius: 10, }}
                label="Title"
                onChangeText={(value) => handleInputChange("title", value)}
            />

            {/*TextInput for Notes*/}
            <TextInput
                value={notesData.notes}
                style={{ margin: 10, height: 400, fontSize: 20, marginBottom: 55, borderRadius: 10 }}
                label="Note"
                multiline
                onChangeText={(value) => handleInputChange("notes", value)}
            />

            <View style={{ flexDirection: 'row', marginBottom: 20 }}>

                {/*Add Note Button*/}
                <Pressable style={{ marginBottom: 42, backgroundColor: 'skyblue', marginLeft: 25, marginRight: 25, width: 200, alignItems: 'center', padding: 8, borderRadius: 12, shadowColor: 'black', elevation: 3 }} onPress={() => { handleSubmit(); addNoteToFirestore(notesDataFirebase.title, notesDataFirebase.notes);  }}>
                    <Text style={{ fontSize: 15 }}>Add Note</Text>
                </Pressable>

                {/*Pin Button*/}
                <Pressable onPress={() => { handleSubmit(); addNoteToFirestore(notesDataFirebase.title, notesDataFirebase.notes); }}>
                    <Image
                        source={require('../images/PinNote.png')}
                        style={{
                            tintColor: "black",
                            marginRight: 15,
                            height: 28,
                            width: 30,
                            transform: [{ rotate: '315deg' }],

                        }}
                        resizeMode="contain"  // Contain the image within the defined size
                    />
                </Pressable>

                {/*Remainder Button*/}
                <Pressable>
                    <Image
                        source={require('../images/remainderBell.png')}
                        style={{
                            tintColor: "black",
                            marginRight: 15,
                            height: 33,
                            width: 32,
                            // transform: [{ rotate: '315deg' }],

                        }}
                        resizeMode="contain"  // Contain the image within the defined size
                    />
                </Pressable>

                {/*Archive Button*/}
                <Pressable>
                    <Image
                        source={require('../images/archive.png')}
                        style={{
                            tintColor: "black",
                            marginRight: 30,
                            height: 30,
                            width: 30,
                            marginTop: 1.8
                            // transform: [{ rotate: '315deg' }],

                        }}
                        resizeMode="contain"  // Contain the image within the defined size
                    />
                </Pressable>

            </View>

            <View>
                <BottomViewAddNote />
            </View>

        </View>
    );
}