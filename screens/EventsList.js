import React, {useEffect, useState} from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

import { Product } from '../components/Events.js';
import { getProducts } from '../services/ProductsService.js';
import axios from "axios"


export function EventsList ({navigation}) {

  function renderProduct({item: product}) {
    return (
      <Product {...product} 
      onPress={() => {
        navigation.navigate('ProductDetails', {
          productId: product.id,
        });
      }}
      />
    );
  }
  
  const [products, setProducts] = useState([]);
  
  //demo purposes offline
  useEffect(() => {
    setProducts(getProducts());
  });

/*
  //online
  useEffect(() => {
    fetchData();
  }, []);
  */

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  const fetchData = async () => {
    const resp = await fetch("http://localhost:3000/events", requestOptions);
    const data = await resp.json();
    console.log(data);
    setProducts(data);
    
  }


  return (
    <View style={{ backgroundColor: 'white', alignItems: "center", paddingTop: 10 }}>
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
      keyExtractor={(item) => item.id.toString()} //change to _id
      data={products}
      renderItem={renderProduct}
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
  productsListContainer: {
    backgroundColor: '#eeeeee',
    paddingVertical: 8,
    marginHorizontal: 8,
  },
  container: {
    borderRadius: 25,
    backgroundColor: "#eeeeee",
    marginTop: 10
  },
  adSpace: {
    flexDirection: 'row',
    backgroundColor: '#eeeeee',
    height: '5%',
    width: '90%',
    alignItems: 'center',
    justifyContent: "center",
    alignItems: "center",
  }
});
