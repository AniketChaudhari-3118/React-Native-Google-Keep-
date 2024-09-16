
import { Image, Pressable, Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import BottomViewAddNote from "./BottomViewAddNote";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNotesData } from "../ReduxGoogleKeep/action_GoogleKeep";
import firestore, { doc, getFirestore, setDoc } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { db } from './SqlDatabaseConnection'


export const addNoteToFirestore = async (title: string, description: string, isPinned: boolean) => {

    const db = getFirestore();
    const user = auth().currentUser;  // Get the currently authenticated user
    try {

        if (user) {  // Check if the user is authenticated
            await setDoc(doc(db, "notes", user.uid, "doc", title), {
                //This constructs the document reference where the note will be stored. The setDoc function writes data to the Firestore database
                title: title,
                description: description,
                isPinned: isPinned,
                createdAt: firestore.FieldValue.serverTimestamp(), // To store the time of creation
            })
            console.log('Note added!');
        } else {
            console.warn('No user is signed in.');
        }
    } catch (error) {
        console.error("Error adding note: ", error);
    }
};

export function AddNote() {

    const [notesDataFirebase, setNotesDataFirebase] = useState({ title: "", notes: "", isPinned: false, archive: false });
    const [notesData, setNotesData] = useState({ title: "", notes: "", isPinned: false, archive: false });


    const dispatch = useDispatch();

    //const NotesData: any = useSelector((state: any) => state.reducer); 

    const SendData = () => {
        db.transaction((tx) => {
            tx.executeSql(
                `insert into notesdata (title, description) values (?, ?)`,
                [notesData.title, notesData.notes],
                () => {
                    console.warn('Note added Successfully');
                },
                (error) => {
                    console.error('Error adding Note', error);
                }
            );
        });
    }


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

    const handleSubmitAddNote = () => {
        if (notesData.title.trim() !== "" || notesData.notes.trim() !== "") {
            setNotesDataFirebase((prev) => ({ ...prev, isPinned: false, archive: false }));
            addNoteToFirestore(notesDataFirebase.title, notesDataFirebase.notes, notesDataFirebase.isPinned);
            dispatch(addNotesData(notesData));
            setNotesData({ title: "", notes: "", isPinned: false, archive: true  }); // Reset the form after submission
        } else {
            console.warn("Note is empty, not submitting.");
        }
    };

    const handleSubmitPinNote = () => {
        if (notesData.title.trim() !== "" || notesData.notes.trim() !== "") {
            setNotesDataFirebase((prev) => ({ ...prev, isPinned: true, archive: false }))
            dispatch(addNotesData(notesData));
            setNotesData({ title: "", notes: "", isPinned: false, archive: false }); // Reset the form after submission
            addNoteToFirestore(notesDataFirebase.title, notesDataFirebase.notes, notesDataFirebase.isPinned);
        } else {
            console.warn("Note is empty, not submitting.");
        }
    };

    const handleSubmitArchiveNote = () => {
        if (notesData.title.trim() !== "" || notesData.notes.trim() !== "") {
            setNotesDataFirebase((prev) => ({ ...prev, isPinned: true, archive: true}))
            setNotesData({ title: "", notes: "", isPinned: false, archive: false }); // Reset the form after submission
            addNoteToFirestore(notesDataFirebase.title, notesDataFirebase.notes, notesDataFirebase.isPinned);
        } else {
            console.warn("Note is empty, not submitting.");
        }
    };


    return (
        <View>

            {/*TextInput for Title*/}
            <TextInput
                value={notesData.title}
                style={{ margin: 10, fontSize: 20, borderRadius: 10, marginLeft: "3%", marginRight: "3%", height: "5%" }}
                label="Title"
                onChangeText={(value) => handleInputChange("title", value)}
            />

            {/*TextInput for Notes*/}
            <TextInput
                value={notesData.notes}
                style={{ margin: 10, height: "68%", fontSize: 20, marginBottom: 55, borderRadius: 10, marginLeft: "3%", marginRight: "3%" }}
                label="Note"
                multiline
                onChangeText={(value) => handleInputChange("notes", value)}
            />

            <View style={{ flexDirection: 'row', marginBottom: 20 }}>

                {/*Add Note Button*/}
                <Pressable style={{ marginBottom: 42, backgroundColor: 'skyblue', marginLeft: "5%", marginRight: "5%", width: "50%", alignItems: 'center', padding: 8, borderRadius: 12, shadowColor: 'black', elevation: 3 }}
                    onPress={() => {
                        handleSubmitAddNote();
                        addNoteToFirestore(notesDataFirebase.title, notesDataFirebase.notes, notesDataFirebase.isPinned = false); SendData()
                    }}>
                    <Text style={{ fontSize: 15 }}>Add Note</Text>
                </Pressable>

                {/*Pin Button*/}
                <Pressable onPress={() => {
                    handleSubmitPinNote();
                    addNoteToFirestore(notesDataFirebase.title, notesDataFirebase.notes, notesDataFirebase.isPinned = true); SendData()
                }}>
                    <Image
                        source={require('../images/PinNote.png')}
                        style={{
                            tintColor: "black",
                            marginRight: "10%",
                            marginLeft: "5%",
                            height: 26,
                            width: "100%",
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
                            marginLeft: "5%",
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