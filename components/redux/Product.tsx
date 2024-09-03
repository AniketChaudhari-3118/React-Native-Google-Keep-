
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { useDispatch } from 'react-redux'
import { addToCart } from './action';

function Product(props: any) {
    const item = props.item;
    const dispatch = useDispatch();

    const handleAddToCart = (item: any) => {
        dispatch(addToCart(item));
    }
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 30 }}>{item.name}</Text>
            <Text style={{ fontSize: 30 }}>{item.color}</Text>
            <Text style={{ fontSize: 30 }}>{item.price}</Text>
            <Button title='Add to Cart' onPress={() => handleAddToCart(item)} />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        padding: 5,
        alignItems: 'center'
    }
})


export default Product;       