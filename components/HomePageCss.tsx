import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
    },
  
    //style for dialogbox of updating the note
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    dialogBox: {
      width: '80%',
      padding: 20,
      backgroundColor: 'white',
      borderRadius: 10,
      alignItems: 'center',
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 15,
    },
    input: {
      width: '100%',
      padding: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      marginBottom: 10,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
    },
  
  })
  