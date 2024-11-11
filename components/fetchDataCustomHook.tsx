import { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { db } from './SqlDatabaseConnection';
import NetInfo from "@react-native-community/netinfo";
import { useDispatch } from 'react-redux';
import { placeData, searchData } from '../ReduxGoogleKeep/action_GoogleKeep';
import { addNoteToFirestore } from './AddNoteView';


const useFetchNotes = (title: string, description: string, place: boolean) => {
    const [getNotesIsPinned, setGetNotesIsPinned] = useState([{}]);
    const [getNotesOthers, setGetNotesOthers] = useState([{}]);

    //const NotesData: any = useSelector((state: any) => state.reducer);
    //console.warn(NotesData);
    //const notesPinned = NotesData.filter((note: any) => note.isPinned);
    //const notesOthers = NotesData.filter((note: any) => !note.isPinned);
    const fetchNotesFromLocal = async () => {
        try {
            const results = await db.executeSql('SELECT * FROM notes');
            console.warn(results);

            const rows = results[0].rows;
            const notes = [];
            for (let i = 0; i < rows.length; i++) {
                notes.push(rows.item(i));
            }
            return notes;
        } catch (error) {
            console.error('Error fetching notes from SQLite: ', error);
            return [];
        }
    }

    const fetchNotesFromFirebase = async () => {
        const user = auth().currentUser;
        if (user) {
            const notesCollectionIsPinned = await firestore().collection('notes').doc(user.uid).collection("doc").where('isPinned', "==", true).get();  // Filter by the user's unique ID
            // console.warn(notesCollectionIsPinned.docs);
            const notesCollectionOthers = await firestore().collection('notes').doc(user.uid).collection("doc").where('isPinned', "==", false).get();
            setGetNotesIsPinned(notesCollectionIsPinned.docs.map(doc => ({ id: doc.id, ...doc.data() }))); // (isPinned) get the all the data as an object and store all the objects in one array(array of objects)
            setGetNotesOthers(notesCollectionOthers.docs.map(doc => ({ id: doc.id, ...doc.data() }))); // (isPinned) get the all the data as an object and store all the objects in one array(array of objects)
        } else {
            console.error('No user is signed in.');
        }
    }

    const notesPinned = getNotesIsPinned;
    const notesOthers = getNotesOthers;

    //to send the data to searchNotes screen
    const dispatch = useDispatch();
    dispatch(searchData(notesPinned, notesOthers))

    //to place the data on add note on longPress of a note
    dispatch(placeData(title, description, place))


    



    useEffect(() => {
        NetInfo.fetch().then(async (state) => {
            if (state.isConnected) {
                try {
                    fetchNotesFromFirebase();
                } catch (error) {
                    console.error("Error fetching data from Firebase: ", error);
                }
            } else {
                console.warn("User Offline");
                setGetNotesIsPinned(await fetchNotesFromLocal());
            }
        })
    }, [addNoteToFirestore])

    return { notesPinned, notesOthers };
}

export default useFetchNotes;