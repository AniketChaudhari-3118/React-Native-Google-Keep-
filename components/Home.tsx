import { View, Text } from "react-native"

export const Home = (props: any) => {
    //console.warn(props.route.params); //[one way to pass]
    const { name, age } = props.route.params;
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 30 }}>Home Screen</Text>
            <Text style={{ fontSize: 30 }}>Name: {name}</Text>
            <Text style={{ fontSize: 30 }}>Age: {age}</Text>
        </View>
    )
}

/*
    Here we have received the data from the login screen
*/