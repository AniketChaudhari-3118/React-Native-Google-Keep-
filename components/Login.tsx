import { useState } from "react";
import { GestureResponderEvent, View, Text, Button, TextInput } from "react-native";

export const Login = (props: { navigation: { navigate: (arg0: string, { }) => ((event: GestureResponderEvent) => void) | undefined; }; }) => {
  const [name, setName] = useState("");
  const age = 24;
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 30 }}>Login Screen</Text>
      <TextInput style={{ fontSize: 20, borderColor: '#000', borderWidth: 2, padding: 5 }} placeholder="Enter the name"
        onChangeText={(text) => setName(text)} />
      <Button title='Go to Home Page' onPress={() => props.navigation.navigate("Home", { name, age })} />
    </View>
  )
}

/*
  here we have also learned how to pass the data between the screens.
*/ 