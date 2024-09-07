// components/GoogleKeepInterface.tsx

import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { GestureHandlerRootView, Pressable } from 'react-native-gesture-handler';
import BottomTab from './BottomView';
import { useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';


export const GoogleKeepInterface = (props: any) => {
  const [listView, setListView] = useState(false);
  const [notes, setNotes] = useState([{}]);

  const NotesData: any = useSelector((state: any) => state.reducer);
  //console.warn(NotesData);

  const notesPinned = NotesData.filter((note: any) => note.isPinned);
  const notesOthers = NotesData.filter((note: any) => !note.isPinned);

  useEffect(() => {
    // Define an async function inside useEffect
    const fetchNotes = async () => {
      try {
        const notesCollection = await firestore()
          .collection('Notes Data')  // Replace with your collection name
          .get();  // Get all documents in the collection

        // Process the documents
        const notesData = notesCollection.docs.map(doc => ({
          title: doc.data().title,  // Get the title field
          description: doc.data().description,  // Get the description field
        }));

        // console.warn(notesData);
        setNotes(notesData);  // Update the state with the fetched notes
      } catch (error) {
        console.error("Error fetching notes: ", error);
      }
    };

    // Call the async function
    fetchNotes();
  }, []);

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
          <TextInput
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
              <Text style={{ fontSize: 20, marginLeft: 13, marginTop: 5 }}>Pinned</Text>
              <View style={{ marginBottom: 15 }}>
                <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
                  {
                    NotesData.map((item: any) => <Text style={styles.item}>
                      {`${item.title} \n\n ${item.notes}`}</Text>)
                  }
                </View>
              </View>

              {/*Others*/}
              <Text style={{ fontSize: 20, marginLeft: 13 }}>Others</Text>
              < View style={{ marginBottom: 10 }}>
                <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
                  {
                    notesOthers.map((item: any) => <Text style={styles.item}>{`${item.title} \n\n ${item.notes}`}</Text>)
                  }
                </View>
              </View>
            </>
            : <>
              {/*Pinned*/}
              <Text style={{ fontSize: 20, marginLeft: 13, marginTop: 5 }}>Pinned</Text>
              <View style={{ marginBottom: 15 }}>
                <View style={{ flex: 1 }}>
                  {notesPinned.map((item: any) => <Text style={styles.itemListView}>
                    {`${item.title} \n\n ${item.notes}`}</Text>)}
                </View>
              </View>

              {/*Others*/}
              <Text style={{ fontSize: 20, marginLeft: 13, marginTop: 5 }}>Others</Text>
              <View style={{ marginBottom: 15 }}>
                <View style={{ flex: 1 }}>
                  {notesOthers.map((item: any) => <Text style={styles.itemListView}>
                    {`${item.title} \n\n ${item.notes}`}</Text>)}
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
    margin: 4,
    marginLeft: 16,
    padding: 11,
    width: 170,
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
    marginLeft: 20,
    padding: 11,
    width: 352,
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