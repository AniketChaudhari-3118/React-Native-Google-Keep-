import { Image, Pressable, Text, TextInput, View } from "react-native";
import { useSelector } from "react-redux";


const PinnedNotesData: any = useSelector((state: any) => state.reducer.notesPinned);
const OthersNotesData: any = useSelector((state: any) => state.reducer.notesOthers);
console.warn(PinnedNotesData);


export function SearchNotes(props: any) {
    return (
        <View style={{ flex: 1 }}>

            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', backgroundColor: 'aliceblue' }}>

                <Pressable style={{ width: "10%", height: "65%", marginLeft: "4%", justifyContent: 'center' }}
                    onPress={() => props.navigation.navigate('DrawerView')}
                >
                    <Image
                        source={require('../images/back.png')}
                        style={{ width: 30, height: 30, tintColor: 'black' }}
                        resizeMode="contain"
                    />
                </Pressable>

                <TextInput style={{ width: "80%", fontSize: 20, marginLeft: "2%" }} placeholder="Search your notes" />
            </View>

            <View style={{ flex: 9, backgroundColor: 'ghostwhite' }}>

            </View>

        </View>
    );
}