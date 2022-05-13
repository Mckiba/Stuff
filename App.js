import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EventsList } from './screens/EventsList.js';
import ActionBarImage from './components/ActionBarImage.js';
import EventForms from './screens/EventForms.js'
import OrganiserForms from './screens/OrganiserForms.js'
import Confirmation from './screens/Confirmation.js';
import * as Linking from 'expo-linking';
import Header from './components/Header.js';

const Stack = createNativeStackNavigator();
const prefix = Linking.createURL('/');

function App() {
  const linking = {
    prefixes: [prefix],
  };

  return (
      <NavigationContainer  linking={linking}>
        <Stack.Navigator>
        <Stack.Screen name='Events' component={EventsList} 
            options={({navigation}) => ({
              headerShadowVisible: false,
              headerTitleStyle: styles.headerTitle,
              headerTitle: () => <ActionBarImage />,
          })}/>
         <Stack.Screen name='AddEvent' component={EventForms} 
            options={({ navigation }) => ({
              title: '',
              headerTitleStyle: styles.headerTitle,
              headerShown: false,
              }
          )}/>
          <Stack.Screen name='AddOrganiser' component={OrganiserForms} 
            options={({ navigation }) => ({
              title: '',
              headerTitleStyle: styles.headerTitle,
              headerShown: false,
              }
          )}/>
          <Stack.Screen name='Confirmation' component={Confirmation} 
            options={({ navigation }) => ({
              title: '',
              headerShown: false,
              contentStyle:{
                backgroundColor:'#FFFFFF'
              }}
          )}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 20,
    height: 200,
  },
  title: {
    fontSize: 20,
    height: 200,
    width: '100%',
    height: '20%',
    backgroundColor: '#03A9F5'
  }
});

export default App;