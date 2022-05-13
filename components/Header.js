import React from 'react';
 
import {View, Image, Text} from 'react-native';
 
const Header = () => {
  return (
    <View style={{  flexDirection: 'column', alignItems: 'center', justifyContent:'center',backgroundColor: '#03A9F5' }}>
      <Text style={{color: '#FFFFFF',fontSize:12,fontFamily:'Helvetica Neue',letterSpacing:3.6,opacity: 1,marginBottom:20,marginTop:31}}>WELCOME TO</Text>
      <Image
          source={require('../assets/logo.png')}   
          style={{  width: 94, height: 84, marginBottom: 2}}
      />
      <Text style={{color: '#FFFFFF',fontSize:13,fontFamily:'Helvetica Neue',opacity:1, fontWeight:'bold'}}>LOCALE</Text>
    </View>
  );
};
 
export default Header;