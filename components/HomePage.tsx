// components/GoogleKeepInterface.tsx

import React, { useEffect, useState } from 'react';
import { Button, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';
import { GestureHandlerRootView, Pressable } from 'react-native-gesture-handler';
import BottomTab from './BottomView';
import useFetchNotes from './fetchDataCustomHook';
import axios from 'axios';
import { auth, firestore } from '../firebase';
import { styles } from './HomePageCss'


export const HomePage = (props: any) => {

  const [listView, setListView] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);

  //to store title and description for displaying on modal/dialog box
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [noteId, setNoteId] = useState("");

  //to update title and description for displaying on modal/dialog box
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");

  //to let know the addNote that to place the data or not
  const [place, setPlace] = useState(false);
  const { notesPinned, notesOthers } = useFetchNotes(title, description, place);

  // const [data, setData] = useState(); //to store the data fetched from api's


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


  const updateNoteFromFirebase = async (noteId: string) => {
    const user = auth().currentUser;

    if (user) {
      try {
        // Use existing title and description if new ones are not provided
        const newTitle = updateTitle || title;
        const newDescription = updateDescription || description;

        await firestore()
          .collection('notes')
          .doc(user.uid)
          .collection('doc')
          .doc(noteId)
          .update({
            title: newTitle,         // new title value
            description: newDescription // new description value
          });
        setShowModalUpdate(false);
        console.warn("Note updated successfully!");
      } catch (error) {
        console.error("Error updating note: ", error);
      }
    } else {
      console.error("User is not authenticated.");
    }
  }

  // node data fetch
  // useEffect(() => {
  //   axios.get('http://localhost:3000/api/v1/notes/fetch')
  //     .then(response => setData(response.data))
  //     .catch(error => console.error(error));
  //   console.warn(data);
  // }, [])

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
                  <Text style={{ color: 'red' }}>Delete</Text>
                </TouchableOpacity>

                {/*Update Button*/}
                <TouchableOpacity onPress={() => setShowModalUpdate(true)} style={{ marginRight: "50%" }} >
                  <Text style={{ color: 'green' }}>Update</Text>
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


      {/*To show modal when we press the update button*/}
      <Modal visible={showModalUpdate} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.dialogBox}>
            <Text style={styles.title}>Update Note</Text>

            <TextInput
              style={styles.input}
              placeholder="Title"
              value={updateTitle}
              onChangeText={(value) => setUpdateTitle(value)}
            />

            <TextInput
              style={styles.input}
              placeholder="Description"
              value={updateDescription}
              onChangeText={(value) => setUpdateDescription(value)}
              multiline
            />

            <View style={styles.buttonContainer}>
              <Button title="Update" onPress={() => updateNoteFromFirebase(noteId)} />
              <Button title="Cancel" color="red" onPress={() => setShowModalUpdate(false)} />
            </View>
          </View>
        </View>
      </Modal>



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




