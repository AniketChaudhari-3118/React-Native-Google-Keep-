import { useEffect, useState } from "react";
import { Image, Pressable, TextInput, View } from "react-native";
import { useSelector } from "react-redux";


export function SearchNotes(props: any) {
    const NotesData: any = useSelector((state: any) => state.reducer);
    // console.warn(NotesData);
    const { pinnedNotes, otherNotes } = NotesData;
    const allNotes = [...pinnedNotes, ...otherNotes];

    const [data, setData] = useState("");
    const searchNotes = (query: String) => {
        let result: any = [];
        result = allNotes.filter((note: any) =>
            note.title.toLowerCase().includes(query.toLowerCase())
        );

        console.warn(result);
    }

    return (
        <View style={{ flex: 1 }}>

            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', backgroundColor: 'aliceblue' }}>

                {/*To navigate back to GoogleKeep Interface*/}
                <Pressable style={{ width: "10%", height: "65%", marginLeft: "4%", justifyContent: 'center' }}
                    onPress={() => props.navigation.navigate('DrawerView')}
                >
                    <Image
                        source={require('../images/back.png')}
                        style={{ width: 30, height: 30, tintColor: 'black' }}
                        resizeMode="contain"
                    />
                </Pressable>

                {/*To Search the notes*/}
                <TextInput style={{ width: "80%", fontSize: 20, marginLeft: "2%" }} placeholder="Search your notes"
                    value={data} onChangeText={(text) => { setData(text); searchNotes(text); }} />
            </View>

            <View style={{ flex: 9, backgroundColor: 'ghostwhite' }}>

            </View>

        </View>
    );
}