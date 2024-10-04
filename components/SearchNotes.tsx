import { useState } from "react";
import { Text } from "react-native";
import { Image, Pressable, StyleSheet, TextInput, View } from "react-native";
import { useSelector } from "react-redux";


export function SearchNotes(props: any) {
    const NotesData: any = useSelector((state: any) => state.reducer);
    // console.warn(NotesData);
    const [finaldata, setFinaldata] = useState<any[]>([]);

    {/*Destructure the data taken using redux*/ }
    const { pinnedNotes, otherNotes } = NotesData;
    const allNotes = [...pinnedNotes, ...otherNotes];

    const [data, setData] = useState("");
    const searchNotes = (query: String) => {
        let result: any = [];
        result = allNotes.filter((note: any) =>
            note.title.toLowerCase().includes(query.toLowerCase())
        );

        // console.warn(result);
        setFinaldata(result);
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
                <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
                    {
                        finaldata.map((item: any) => <Text style={styles.item}>
                            {`${item.title} \n\n ${item.description}`}</Text>)
                    }
                </View>
            </View>

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
        marginLeft: "4%",
        marginRight: "3%",
        padding: 11,
        width: "42%",
        height: 100,
        shadowColor: 'black',
        elevation: 5
    },
})