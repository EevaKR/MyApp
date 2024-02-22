import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button, Text, TextInput, SafeAreaView, ScrollView } from 'react-native'
import { orderBy, app, collection, addDoc, MESSAGES, serverTimestamp, query, onSnapshot, firestore } from './firebase/Config';
import React, { useState, useEffect } from 'react';


export default function App() {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')


  useEffect(() => {
    const q =query(collection(firestore,MESSAGES))
    const unsubscribe = onSnapshot(q,(querySnapshot) => {
      const tempMessages = []

      querySnapshot.forEach((doc) => {
        tempMessages.push(doc.data())
      })
      setMessages(tempMessages)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const save = async () => {
    const docRef = await addDoc(collection(firestore, MESSAGES), {
      text: newMessage,
      created: serverTimestamp()
    }).catch(error => console.log(error))

    setNewMessage('')
    console.log('Message saved.')
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {
          messages.map((message) => (
            <View style={styles.message}>
              <Text>{message.text}</Text>
            </View>
          ))
        }
      </ScrollView>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7fb366',
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#ea9782',
    borderColor: '#ecddcd',
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10


  }
});
