
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

function Header() {

  const cartData: any = useSelector((state: any) => state.reducer)
  const [cartItems, setCartItems] = useState(0);
  console.warn(cartData);

  useEffect(() => {
    setCartItems(cartData.length);
  }, [cartData])
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, marginLeft: 350 }}>{cartItems}</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'orange'
  }
})


export default Header;       