import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button, Text, TextInput, SafeAreaView, ScrollView } from 'react-native'
import { orderBy, app, collection, addDoc, MESSAGES, serverTimestamp, query, onSnapshot, firestore } from './firebase/Config';
import React, { useState } from 'react';
import { convertFirebaseTimeStampToJS } from './helpers/Functions';
import { useReducer, useRef, useEffect } from 'react';
import Timer from './components/Timer';
import Clock from './components/Clock';
import Home from './screens/Home';

import TimerPage from './screens/TimerPage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';


///hox tee components and screens kansiot ja jaa osiot ja sivut niihin


//propsit puuttuu
export default function App() {

  const Stack = createNativeStackNavigator();

  // useEffect(() => {
  //   const q = query(collection(firestore, MESSAGES), orderBy('created', 'desc'))
  //   const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //     const tempMessages = []

  //     querySnapshot.forEach((doc) => {
  //       const messageObject = {
  //         id: doc.id,
  //         text: doc.data().text,
  //         created: convertFirebaseTimeStampToJS(doc.data().created)
  //       }
  //       tempMessages.push(messageObject)
  //     })
  //     setMessages(tempMessages)
  //   })

  //   return () => {
  //     unsubscribe()
  //   }
  // }, [])

  // const save = async () => {
  //   const docRef = await addDoc(collection(firestore, MESSAGES), {
  //     text: newMessage,
  //     created: serverTimestamp()
  //   }).catch(error => console.log(error))

  //   setNewMessage('')
  //   console.log('Message saved.')
  // }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: 'Home',
              headerTitle: 'Home'}}
          /> 
          <Stack.Screen name = "TimerPage" component= {TimerPage}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FB6B90',
    alignItems: 'center',
    justifyContent: 'center',
  },


  buttons: {
    backgroundColor: '#FB8DA0',
    padding: 500,
    borderRadius: 30, // Make the buttons more round
    marginTop: 100,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 300, // Add space between the buttons
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 20,
    elevation: 100,

  },
  buttonsText: {
    color: '#FB4570',
    textAlign: 'center'
  },
  time: {
    color: '#EFEBE0',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 40,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 30,
    backgroundColor: '#FB8DA0',
    borderRadius: 30,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 30,
    elevation: 30,
    padding: 20,
  }
});
