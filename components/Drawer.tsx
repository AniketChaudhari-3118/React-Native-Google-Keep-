import React, { useEffect, useState } from 'react';
import { Button, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer'
import { HomePage } from './HomePage';
import { auth, firestore } from '../firebase';
import NetInfo from "@react-native-community/netinfo";
import { AddNote } from './AddNoteView';


const Drawer = createDrawerNavigator();

export default function Drawer1() {

  const [getNotesArchive, setGetNotesArchive] = useState([{}]);

  const fetchArchiveNotesFromFirebase = async () => {
    const user = auth().currentUser;
    if (user) {
      const data = await firestore().collection('notes').doc(user.uid).collection("doc").where('archive', "==", true).onSnapshot(querySnapshot => {
        const notesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setGetNotesArchive(notesData);
      });
      //console.warn(getNotesArchive);

      return data;
    } else {
      console.error('Error fetching Archive Data!');
    }
  }

  useEffect(() => {
    NetInfo.fetch().then(async (state) => {
      if (state.isConnected) {
        try {
          fetchArchiveNotesFromFirebase();
        } catch (error) {
          console.error("Error fetching data from Firebase: ", error);
        }
      } else {
        console.error("User Offline");
      }
    })
  }, [fetchArchiveNotesFromFirebase, AddNote])

  return (
    <Drawer.Navigator initialRouteName='GoogleKeepInterface'>

      <Drawer.Screen name="Keep" component={HomePage} options={{
        headerShown: false,
        drawerIcon: () => (
          <Image
            source={require('../images/Google.png')}
            style={{ width: 90, height: "300%" }}
            resizeMode="center"
          />

        ),
      }} />

      <Drawer.Screen name="Notes" component={Notes} options={{
        headerTitleStyle: {
          fontSize: 30
        },
        drawerIcon: ({ color, size }) => (
          <Image
            source={require('../images/bulb.png')}
            style={{ width: 25, height: 25, tintColor: color }}
            resizeMode="contain"
          />
        ),
      }} />

      <Drawer.Screen name="Remainders" component={Remainders} options={{
        headerTitleStyle: {
          fontSize: 30
        },
        drawerIcon: ({ color, size }) => (
          <Image
            source={require('../images/bell.png')}
            style={{ width: 25, height: 25, tintColor: color }}
            resizeMode="contain"
          />
        ),
      }} />

      <Drawer.Screen name="CreateNewLabel" component={CreateNewLabel} options={{
        headerTitleStyle: {
          fontSize: 30
        },
        drawerIcon: ({ color, size }) => (
          <Image
            source={require('../images/plus.png')}
            style={{ width: 25, height: 25, tintColor: color }}
            resizeMode="contain"
          />
        ),
      }} />

      <Drawer.Screen name="Archive" options={{
        headerTitleStyle: {
          fontSize: 30
        },
        drawerIcon: ({ color, size }) => (
          <Image
            source={require('../images/archive.png')}
            style={{ width: 25, height: 25, tintColor: color }}
            resizeMode="contain"
          />
        ),
      }}>
        {() => <ArchiveWrapper getNotesArchive={getNotesArchive} />}
      </Drawer.Screen>

      <Drawer.Screen name="Trash" component={Trash} options={{
        headerTitleStyle: {
          fontSize: 30
        },
        drawerIcon: ({ color, size }) => (
          <Image
            source={require('../images/trash.png')}
            style={{ width: 25, height: 25, tintColor: color }}
            resizeMode="contain"
          />  
        ),
      }} />

      <Drawer.Screen name="Settings" component={Settings} options={{
        headerTitleStyle: {
          fontSize: 30
        },
        drawerIcon: ({ color, size }) => (
          <Image
            source={require('../images/settings.png')}
            style={{ width: 25, height: 25, tintColor: color }}
            resizeMode="contain"
          />
        ),
      }} />

      <Drawer.Screen name="Help & feedback" component={Help_Feedback} options={{
        headerTitleStyle: {
          fontSize: 30
        },
        drawerIcon: ({ color, size }) => (
          <Image
            source={require('../images/Help.png')}
            style={{ width: 25, height: 25, tintColor: color }}
            resizeMode="contain"
          />
        ),
      }} />
    </Drawer.Navigator>

  );
}

const ArchiveWrapper = (props: any) => {
  return <Archive getNotesArchive={props.getNotesArchive} />;
};

const Notes = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 30 }}>Login</Text>
    </View>
  );
}

const Remainders = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 30 }}>SignUp</Text>
    </View>
  );
}

const CreateNewLabel = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 30 }}>Other</Text>
    </View>
  );
}

const Archive = ({ getNotesArchive = [{}] }) => {
  const [listView, setListView] = useState(true);

  return (
    <View style={{ flex: 1, }}>
      <View>
        {listView == false ?
          <View>
            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
              {
                getNotesArchive.map((item: any) => <Text style={styles.item}>{`${item.title} \n\n ${item.description}`}</Text>)
              }
            </View>
          </View>
          :
          <View>
            <View style={{ flex: 1 }}>
              {getNotesArchive.map((item: any) => <Text style={styles.itemListView}>
                {`${item.title} \n\n ${item.description}`}</Text>)}
            </View>
          </View>
        }
      </View>

      {/*ListView and GridView buttons*/}
      <Pressable onPress={() => setListView(!listView)}  >
        {listView ? (
          <Image style={styles.ListGridView}
            source={require('../images/grid.png')} // Display list view image
          />
        ) : (
          <Image style={styles.ListGridView}
            source={require('../images/ListView.png')} // Display grid view image
          />
        )}
      </Pressable>

    </View>
  );
}


const Trash = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 30 }}>Settings</Text>
    </View>
  );
}

const Settings = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 30 }}>Settings</Text>
    </View>
  );
}

const Help_Feedback = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 30 }}>Settings</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
    elevation: 5,
    marginTop: 4
  },
  ListGridView: {
    width: 50,
    height: 50,
    marginTop: "156%",
    marginLeft: "83%",
    zIndex: 12
  }
})

