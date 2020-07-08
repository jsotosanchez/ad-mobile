import React from 'react';
import { View, TouchableOpacity } from 'react-native';

export default function BurgerMenu({ navigation }) {
  return (
    <View style={{ marginLeft: 10 }}>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <View
          style={{
            width: 35,
            height: 5,
            backgroundColor: 'white',
            marginTop: 6,
          }}
        ></View>
        <View
          style={{
            width: 35,
            height: 5,
            backgroundColor: 'white',
            marginTop: 6,
          }}
        ></View>
        <View
          style={{
            width: 35,
            height: 5,
            backgroundColor: 'white',
            marginTop: 6,
          }}
        ></View>
      </TouchableOpacity>
    </View>
  );
}
