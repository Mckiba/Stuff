import React from 'react';
 
import {View, Image} from 'react-native';
 
const ActionBarImage = () => {
  return (
    <View >
      <Image
      source={require('../assets/header.png')}   
        style={{
          width: 180,
          height: 48,
         marginRight: 10,
        }}
      />
    </View>
  );
};
 
export default ActionBarImage;