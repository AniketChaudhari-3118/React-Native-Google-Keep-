
import { Image, Pressable, Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import BottomViewAddNote from "./BottomViewAddNote";

export function AddNote() {
    return (
        <View>
            <TextInput style={{ margin: 10, fontSize: 20 }} label="Title" ></TextInput>
            <TextInput style={{ margin: 10, height: 500, fontSize: 20 , marginBottom: 55}} label="Note" multiline ></TextInput>

            <View>
                <BottomViewAddNote />
            </View>
        </View>
    );
}


export function Header() {

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Pressable>
                <Text>{''}</Text>
            </Pressable>
        </View>
    );
}