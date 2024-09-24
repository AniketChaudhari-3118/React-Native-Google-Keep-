// components/GoogleKeepInterface.tsx

import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { GestureHandlerRootView, Pressable } from 'react-native-gesture-handler';
import BottomTab from './BottomView';
import firestore from '@react-native-firebase/firestore';
import { addNoteToFirestore } from './AddNoteView';
import auth from '@react-native-firebase/auth';
import { db } from './SqlDatabaseConnection';
import NetInfo from "@react-native-community/netinfo";
import { useDispatch } from 'react-redux';
import { searchData } from '../ReduxGoogleKeep/action_GoogleKeep';


export const GoogleKeepInterface = (props: any) => {

  const [listView, setListView] = useState(true);
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

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'white' }}>

      <ScrollView style={{ marginBottom: 40, backgroundColor: 'ghostwhite' }}>
        {/*Search bar*/}
        <View style={styles.SearchBar}>

          {/*Drawer Button*/}
          <Pressable style={styles.DrawerButton} onPress={() => props.navigation.openDrawer()} >
            <Text style={styles.DrawerButtonText}>&#9776;</Text>
          </Pressable>

          {/*Text Input (Search)*/}
          <TextInput onFocus={() => props.navigation.navigate('SearchNotes')}
            style={styles.TextInputSearch}
            placeholder="Search your notes" />

          {/*ListView and GridView buttons*/}
          <Pressable onPress={() => setListView(!listView)} style={styles.ListGridView}>
            {listView ? (
              <Image style={styles.GridView}
                source={require('../images/grid.png')} // Display list view image
              />
            ) : (
              <Image style={styles.ListView}
                source={require('../images/ListView.png')} // Display grid view image
              />
            )}
          </Pressable>

          {/*account button image*/}
          <Pressable style={styles.AccountImagePress}>
            <Image style={styles.AccountImage}
              source={require('../images/photo.png')} // Display list view image
            />
          </Pressable>

        </View>

        {
          listView == false ?
            <>
              {/*Notes View*/}
              {/*Pinned*/}
              <Text style={{ fontSize: 20, marginLeft: "5%", marginTop: "5%" }}>Pinned</Text>
              <View style={{ marginBottom: "15%" }}>
                <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
                  {
                    notesPinned.map((item: any) => <Text style={styles.item}>
                      {`${item.title} \n\n ${item.description}`}</Text>)
                  }
                </View>
              </View>

              {/*Others*/}
              <Text style={{ fontSize: 20, marginLeft: "5%" }}>Others</Text>
              < View style={{ marginBottom: "100%" }}>
                <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
                  {
                    notesOthers.map((item: any) => <Text style={styles.item}>{`${item.title} \n\n ${item.description}`}</Text>)
                  }
                </View>
              </View>
            </>
            : <>
              {/*Pinned*/}
              <Text style={{ fontSize: 20, marginLeft: "5%", marginTop: "5%" }}>Pinned</Text>
              <View style={{ marginBottom: "0%" }}>
                <View style={{ flex: 1 }}>
                  {notesPinned.map((item: any) => <Text style={styles.itemListView}>
                    {`${item.title} \n\n ${item.description}`}</Text>)}
                </View>
              </View>

              {/*Others*/}
              <Text style={{ fontSize: 20, marginLeft: "5%", marginTop: "20%" }}>Others</Text>
              <View style={{ marginBottom: "50%" }}>
                <View style={{ flex: 1 }}>
                  {notesOthers.map((item: any) => <Text style={styles.itemListView}>
                    {`${item.title} \n\n ${item.description}`}</Text>)}
                </View>
              </View>
            </>
        }

      </ScrollView>

      {/*Add note button*/}
      <Pressable style={styles.addNoteButtonContainer} onPress={() => props.navigation.navigate('AddNote')} >
        <Text style={{ textAlign: 'center', fontSize: 35, color: 'blue' }}>+</Text>
      </Pressable>

      {/* Bottom Navigation */}
      <View style={styles.bottomTabContainer}>
        <BottomTab />
      </View>

    </GestureHandlerRootView >
  );
};


const styles = StyleSheet.create({
  SearchBar: {
    flexDirection: 'row',
    marginLeft: 15,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
    marginTop: 20,
    marginBottom: 10,
    shadowColor: 'grey',
    elevation: 2,
    backgroundColor: "aliceblue",
    borderWidth: 0.5
  },
  DrawerButton: {
    flex: 1,
    height: '80%',
    width: '100%',
    marginLeft: 15,
    marginBottom: 5
  },
  DrawerButtonText: {
    textAlign: 'center',
    fontSize: 30
  },
  TextInputSearch: {
    fontSize: 20,
    flex: 7,
    marginLeft: 8
  },
  ListGridView: {
    flex: 1.5,
    height: "60%",
    marginRight: 20
  },
  GridView: {
    flex: 1.5,
    width: '100%',
    marginRight: 45
  },
  ListView: {
    flex: 1.5,
    width: '100%',
    height: "50%",
    marginRight: 45
  },
  AccountImagePress: {
    flex: 1.5,
    height: "80%",
    width: "40%",
    marginRight: 30
  },
  AccountImage: {
    height: "100%",
    width: "100%",
    borderRadius: 25
  },
  item: {
    borderWidth: 0.5,
    borderRadius: 10,
    fontSize: 15,
    backgroundColor: 'ghostwhite',
    color: '#000',
    margin: 10,
    marginLeft: "6%",
    padding: 11,
    width: "40%",
    height: 100,
    shadowColor: 'black',
    elevation: 5
  },
  itemListView: {
    borderWidth: 0.5,
    borderRadius: 10,
    fontSize: 15,
    backgroundColor: 'ghostwhite',
    color: '#000',
    margin: 4,
    marginLeft: "5%",
    padding: 11,
    width: "90%",
    height: 100,
    shadowColor: 'black',
    elevation: 5
  },
  bottomTabContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: 'red',
    color: 'red',
    shadowColor: '#CCCCFF',
    elevation: 5
  },
  addNoteButtonContainer: {
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,  // Adjust based on how much you want it to overlap
    right: 50,   // Align to the right side
    width: 58,
    height: 60,
    borderRadius: 18,
    borderWidth: 5,
    borderColor: 'ghostwhite',
    backgroundColor: '#CCCCFF',
    zIndex: 12,
    shadowColor: '#CCCCFF',
    elevation: 5

  },

})


