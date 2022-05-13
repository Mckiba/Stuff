import React, { Component } from 'react';
import { Button, Platform, StyleSheet, Text, View, Image } from 'react-native';

export default class Confirmation extends Component {
  render() {
    return (
        <View style={styles.Container}>
          <Image
          source={require('../assets/Clap-Hand@2x.png')}
          style={{width: 33, height:29, marginBottom: 17,}}
          />
          <Text style={styles.Text}></Text>
          <View style={{width: '68%'}}>
            <Text style={styles.message}>Thank you for sharing your events here. We will review the details of your event and should be made published within 48 hours.</Text>
          </View>
          <View style={styles.btnContainer}>
                <Button title="Continue" onPress={()=>{this.props.navigation.navigate('Events')}} />
          </View>
        </View>
      );
  }
}
const styles = StyleSheet.create({
    btnContainer: {
      backgroundColor: "white",
      marginTop:36,
      borderRadius: 5,
      height: 43,
      width: 321
    },
    Text:{
        fontFamily: 'Helvetica Neue',
        fontSize: 13,
        color: '#505050',
        textDecorationLine: 'underline', 
        textDecorationColor: '#FFEC0D',
        marginBottom: 25,
        fontWeight: 'bold'
    },
    message:{
        color:'#717171',
        fontSize:13,
        fontFamily:'Helvetica Neue',
        opacity: 1
    },
    Container:{
        flexDirection:'column',
        marginTop:'40%',
        alignItems:'center', 
        flex:1,
        backgroundColor: 'white',
        width: '100%',
        height: '100%'
    }
  });