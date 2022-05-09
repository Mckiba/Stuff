import React, {useEffect, useState} from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Image } from 'react-native';

import { Product } from '../components/Events.js';
import { getEvents } from '../services/EventsService.js';

export function EventsList ({navigation}) {

  function renderEvent({item: event}) {
    return (
      <Product {...event} 
      />
    );
  }
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  
  //for  offline use
  /*useEffect(() => {
    setProducts(getEvents());
  });*/ 

  useEffect(() => {
    fetchData();
  }, []);  

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  const fetchData = async () => {
    const resp = await fetch("http://localhost:3000/events", requestOptions);
    const data = await resp.json();
    setProducts(data);
    setFilteredDataSource(data);
  }


  const searchFilterFunction = (text) => {
    if (text) {
      const newData = products.filter(
        function (item) {
          const itemData = item.eventName
            ? item.eventName.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(products);
      setSearch(text);
    }
  };

  return (
    <View style={{ backgroundColor: 'white', alignItems: "center", paddingTop: 10 }}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.textInputStyle}
            onChangeText={(text) => searchFilterFunction(text)}
            value={search}
            underlineColorAndroid="transparent"
            placeholder="Search Event"
          />
          <Image style={{width:19,height:19}} source={require('../assets/search.png')} />
        </View>
       <View
          style={styles.adSpace}>
          <Text
            style={{
              textAlign: 'center',
              color: 'grey',
              fontWeight: 'bold'
            }}>
            AdSpace
          </Text>
        </View>
    <View style={styles.container}>
    <Text style={{fontSize: 18, fontWeight: 'bold',padding:8}}>Events in #Jamaica</Text> 
    <FlatList
      style={styles.productsList}
      contentContainerStyle={styles.productsListContainer}
      keyExtractor={(item) => item._id.toString()} 
      data={filteredDataSource}
      renderItem={renderEvent}
    />
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  productsList: {
    backgroundColor: '#eeeeee',
    paddingBottom:10
  },
  searchContainer:{
    flexDirection:'row',
    width:'90%',
    alignItems:'center',
    paddingRight:10,
    borderColor: '#D1D1D1',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginBottom:20
  },
  productsListContainer: {
    backgroundColor: '#eeeeee',
    paddingVertical: 8,
    marginHorizontal: 8,
  },
  container: {
    borderRadius: 25,
    backgroundColor: "#eeeeee",
    marginTop: 10,
    width: '100%'
  },
  adSpace: {
    flexDirection: 'row',
    backgroundColor: '#eeeeee',
    height: 87,
    width: '90%',
    alignItems: 'center',
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18
  },
  itemStyle: {
    padding: 10,
  },
  textInputStyle: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    color:'#717171',
    height: 40,
    paddingLeft: 20,
    margin: 5,
    fontSize:12,
    fontWeight:'bold'
   },
});
