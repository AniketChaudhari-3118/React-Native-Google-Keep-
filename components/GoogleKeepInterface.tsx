// components/GoogleKeepInterface.tsx

import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { GestureHandlerRootView, Pressable } from 'react-native-gesture-handler';
import BottomTab from './BottomView';


export const GoogleKeepInterface = (props: any) => {
  const [listView, setListView] = useState(false);

  const notes = [
    {
      Title: 'Aniket',
      Discription: "Loves to play football"
    },
    {
      Title: 'Devendra',
      Discription: "Is a Software Developer"
    },
    {
      Title: 'Pranit',
      Discription: "Works at a Automobile Company"
    },
    {
      Title: 'Shantanu',
      Discription: "He is a great App Developer"
    }
  ]

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'white' }}>

      <ScrollView style={{ marginBottom: 40, backgroundColor: 'ghostwhite' }}>
        {/*Search bar*/}
        <View style={styles.SearchBar}>

          {/*Drawer Button*/}
          <Pressable style={{ flex: 1, height: '80%', width: '100%', marginLeft: 15, marginBottom: 5 }} onPress={() => props.navigation.openDrawer()} >
            <Text style={{ textAlign: 'center', fontSize: 30 }}>&#9776;</Text>
          </Pressable>

          {/*Text Input (Search)*/}
          <TextInput
            style={{ fontSize: 20, flex: 7, marginLeft: 8 }}
            placeholder="Search your notes" />

          {/*ListView and GridView buttons*/}
          <Pressable onPress={() => setListView(!listView)} style={{ flex: 1.5, height: "60%", marginRight: 20 }}>
            {listView ? (
              <Image style={{ flex: 1.5, width: '100%', marginRight: 45 }}
                source={require('../images/grid.png')} // Display list view image
              />
            ) : (
              <Image style={{ flex: 1.5, width: '100%',height: "50%", marginRight: 45 }}
                source={require('../images/ListView.png')} // Display grid view image
              />
            )}
          </Pressable>

          {/*account button image*/}
          <Pressable style={{ flex: 1.5, height: "80%", width: "40%", marginRight: 30 }}>
            <Image style={{ height: "100%", width: "100%", borderRadius: 25 }}
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
                    notes.map((item) => <Text style={styles.item}>
                      {`${item.Title} \n\n ${item.Discription}`}</Text>)
                  }
                </View>
              </View>

              {/*Others*/}
              <Text style={{ fontSize: 20, marginLeft: 13 }}>Others</Text>
              < View style={{ marginBottom: 10 }}>
                <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
                  {
                    notes.map((item) => <Text style={styles.item}>{item.Title}</Text>)
                  }
                </View>
              </View>
            </>
            : <>
              {/*Pinned*/}
              <Text style={{ fontSize: 20, marginLeft: 13, marginTop: 5 }}>Pinned</Text>
              <View style={{ marginBottom: 15 }}>
                <View style={{ flex: 1 }}>
                  {notes.map((item) => <Text style={styles.itemListView}>
                    {`${item.Title} \n\n ${item.Discription}`}</Text>)}
                </View>
              </View>

              {/*Others*/}
              <Text style={{ fontSize: 20, marginLeft: 13, marginTop: 5 }}>Others</Text>
              <View style={{ marginBottom: 15 }}>
                <View style={{ flex: 1 }}>
                  {notes.map((item) => <Text style={styles.itemListView}>
                    {`${item.Title} \n\n ${item.Discription}`}</Text>)}
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
    height: 40,
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