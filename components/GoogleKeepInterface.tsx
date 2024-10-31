// components/GoogleKeepInterface.tsx

import React, { useEffect, useState } from 'react';
import { Button, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';
import { GestureHandlerRootView, Pressable } from 'react-native-gesture-handler';
import BottomTab from './BottomView';
import useFetchNotes from './fetchDataCustomHook';
import axios from 'axios';
import { auth, firestore } from '../firebase';


export const GoogleKeepInterface = (props: any) => {

  const [listView, setListView] = useState(true);
  const [showModal, setShowModal] = useState(false);

  //to store title and description for displaying on modal/dialog box
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [noteId, setNoteId] = useState("");

  //to let know the addNote that to place the data or not
  const [place, setPlace] = useState(false);
  const { notesPinned, notesOthers } = useFetchNotes(title, description, place);

  const [data, setData] = useState(); //to store the data fetched from api's

  const deleteNoteFromFirebase = async (noteId: string) => {
    const user = auth().currentUser;
    if (user) {
      try {
        // Reference to the specific note document for the signed-in user
        await firestore()
          .collection('notes')
          .doc(user.uid)
          .collection('doc')
          .doc(noteId)
          .delete();
        console.log('Note deleted successfully');
      } catch (error) {
        console.error('Error deleting note:', error);
      }
    } else {
      console.error('No user is signed in.');
    }
  };

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/notes/fetch')
      .then(response => setData(response.data))
      .catch(error => console.error(error));
    console.warn(data);
    console.warn("hello");
  }, [])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

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
                    notesPinned.map((item: any) => <TouchableOpacity key={item.id} onLongPress={() => {
                      props.navigation.navigate('AddNote'); setTitle(item.title); setPlace(true);
                      setDescription(item.description)
                    }}
                      onPress={() => {
                        setShowModal(true); setTitle(item.title);
                        setDescription(item.description);
                        setNoteId(item.id);
                      }} style={styles.item}><Text >
                        {`${item.title} \n\n ${item.description}`}</Text></TouchableOpacity>)
                  }
                </View>
              </View>

              {/*Others*/}
              <Text style={{ fontSize: 20, marginLeft: "5%" }}>Others</Text>
              < View style={{ marginBottom: "100%" }}>
                <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
                  {
                    notesOthers.map((item: any) => <TouchableOpacity key={item.id} onLongPress={() => {
                      props.navigation.navigate('AddNote'); setTitle(item.title); setPlace(true);
                      setDescription(item.description);
                      setNoteId(item.id);
                    }}
                      onPress={() => {
                        setShowModal(true); setTitle(item.title);
                        setDescription(item.description);
                        setNoteId(item.id);
                      }} style={styles.item}><Text>
                        {`${item.title} \n\n ${item.description}`}</Text></TouchableOpacity>)
                  }
                </View>
              </View>
            </>
            : <>
              {/*Pinned*/}
              <Text style={{ fontSize: 20, marginLeft: "5%", marginTop: "5%" }}>Pinned</Text>
              <View style={{ marginBottom: "0%" }}>
                <View style={{ flex: 1 }}>
                  {notesPinned.map((item: any) => <TouchableOpacity key={item.id} onLongPress={() => {
                    props.navigation.navigate('AddNote'); setTitle(item.title); setPlace(true);
                    setDescription(item.description)
                  }}
                    onPress={() => {
                      setShowModal(true); setTitle(item.title);
                      setDescription(item.description);
                      setNoteId(item.id);
                    }} style={styles.itemListView}><Text>
                      {`${item.title} \n\n ${item.description}`}</Text></TouchableOpacity>)}
                </View>
              </View>

              {/*Others*/}
              <Text style={{ fontSize: 20, marginLeft: "5%", marginTop: "20%" }}>Others</Text>
              <View style={{ marginBottom: "50%" }}>
                <View style={{ flex: 1 }}>
                  {notesOthers.map((item: any) => <TouchableOpacity key={item.id} onLongPress={() => {
                    props.navigation.navigate('AddNote'); setTitle(item.title); setPlace(true);
                    setDescription(item.description)
                  }}
                    onPress={() => {
                      setShowModal(true); setTitle(item.title);
                      setDescription(item.description);
                      setNoteId(item.id);
                    }} style={styles.itemListView}><Text>
                      {`${item.title} \n\n ${item.description}`}</Text></TouchableOpacity>)}
                </View>
              </View>
            </>
        }

      </ScrollView>

      {/*To show the modal when we press on a note*/}
      {showModal && (
        <Modal

          transparent={true}
          visible={showModal}
          animationType="slide"
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>

              {/*To display Title and Description on Modal*/}
              <Text style={styles.modalText}>{title}</Text>
              <Text style={styles.modalText}>{description}</Text>

              <View style={{ flexDirection: 'row' }}>
                {/* Delete Button */}
                <TouchableOpacity onPress={() => deleteNoteFromFirebase(noteId)} style={{ marginRight: "10%" }} >
                  <Text style={{ color: 'red' }}>Delete Note</Text>
                </TouchableOpacity>

                {/* Close Button */}
                <TouchableOpacity onPress={() => setShowModal(false)}>
                  <Text style={{ color: 'blue' }}>Close</Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>

        </Modal>
      )}

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
  whiteText: {
    color: '#FFFFFF'
  },
  darkText: {
    color: '#000000'
  },
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

  //styling for dialog box
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonView: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 20,
    shadowColor: 'black',
    elevation: 5,
  },
  modalText: {
    fontSize: 25,
    marginBottom: 20,
    marginRight: "45%"
  }

})


