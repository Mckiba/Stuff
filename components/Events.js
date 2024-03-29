import React from 'react';
import {Text, Image, View, StyleSheet, TouchableOpacity, Linking, Platform} from 'react-native';

export function Event({eventName, image, eventDetails,eventDate, eventTime, eventLocation, onPress, checkoutLink, organiserPhone}) {

  //const url = `sms:${organiserPhone}${Platform.OS === "ios" ? "&" : "?"}body=${""}`
  const url =  `bip://NewP2PMessage?msisdn=${organiserPhone}&text=Hallo,+ik+heb+een+vraag`
  return (
    <View>
      <TouchableOpacity style={styles.card} onPress={onPress}>
        <Image
          style={styles.thumb}
          source={image}  
        />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{eventName}</Text>
          <Text style={styles.descriptionText}>{eventDetails}</Text>

          <View style={styles.mainRow}>
            <Image style={styles.iconStyle} source={require('../assets/date.png')}/>
            <Text style={styles.eventText}>{eventDate}</Text>
          </View>

          <View style={styles.mainRow}>
            <Image style={{ width:19.4, height:20.74, marginRight: 10.6}} source={require('../assets/time.png')}/>
          <Text style={styles.eventText}>{eventTime}</Text>
          </View>

          <View style={styles.mainRow}>
            <Image style={{ width:21.66, height:16.94, marginRight: 9.34}} source={require('../assets/location.png')}/>
            <Text style={styles.eventText}>{eventLocation}</Text>
          </View>

          <TouchableOpacity onPress={ ()=>{ Linking.openURL(url)}} style={styles.message}>
            <Image style={{ width:25, height:22,marginRight:12}} source={require('../assets/message.png')}/>
            <Text style={styles.buttonText}>Message Organiser</Text>
          </TouchableOpacity>

        { checkoutLink !== '' ? 
          <View style={styles.row}>
            <TouchableOpacity  onPress={ ()=>{ Linking.openURL(`${checkoutLink}`)}} style={styles.message2}>
              <Image style={{ width:25, height:20,marginRight:10.59}} source={require('../assets/shop.png')}/>
              <Text style={styles.buttonText}>Buy Ticket</Text>
            </TouchableOpacity >

            <TouchableOpacity style={styles.message2}>
              <Image style={{ width:20, height:21,marginRight:11.42}} source={require('../assets/share.png')}/>
              <Text style={styles.buttonText}>Tell a friend</Text>
            </TouchableOpacity>
          </View>
            :
            <TouchableOpacity style={styles.message}>
              <Image style={{ width:25, height:26,marginRight:12}} source={require('../assets/share.png')}/>
              <Text style={styles.buttonText}>Tell a friend</Text>
            </TouchableOpacity>
        }
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    shadowColor: 'black',
    width: '100%',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,
    marginVertical: 20,
  },
  iconStyle: {
    width:19.19, 
    height:20.74, 
    marginRight: 10.81
  },
  mainRow:{
      flexDirection:'row',
      justifyContent:'flex-start',
      alignItems:'center',
      marginTop:8
  },
  thumb: {
    height: 376,
    width: '100%',
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  eventText: {
    fontSize: 14,
    marginTop: 5,
    color: '#696868'
  },
  descriptionText: {
    fontSize: 14,
    marginTop: 8,
    marginBottom:12.24,
    color: "#696868",
    fontFamily:'Helvetica Neue'
    
  },
  nextContainer: {
    backgroundColor: "#03a9f5",
  },
  message:{
    flexDirection: 'row',
    alignItems: "center",
    backgroundColor: "#03a9f5",
    justifyContent:'center',
    marginTop: 20,
    fontSize: 15,
    height: 39

  },
  message2:{
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: "center",
    backgroundColor: "#03a9f5",
    width: '49%',
    fontSize: 15,
    marginTop: 10,
    padding: 10,
    height: 39
  },
  buttonText:{
    fontSize:14,
    color: "#ffffff",
    alignItems: "center"
  },
  row:{
    display: 'flex',
    flexDirection:'row',
    justifyContent: 'space-between',    
  }
});
