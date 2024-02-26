import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button, Text, TextInput, SafeAreaView, ScrollView } from 'react-native'
import { orderBy, app, collection, addDoc, MESSAGES, serverTimestamp, query, onSnapshot, firestore } from './firebase/Config';
import React, { useState } from 'react';
import { convertFirebaseTimeStampToJS } from './helpers/Functions';
import { useReducer, useRef, useEffect } from 'react';
import Timer from './components/Timer'
import Clock from './components/Clock';


///hox tee components and screens kansiot ja jaa osiot ja sivut niihin

export default function App() {

  
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')

  const initialState = {
    isRunning: false,
    time: 0
  }


  const reducer = (state, action) => {
    switch (action.type) {
      case 'aloita':
        return { ...state, isRunning: true }
      case 'lopeta':
        return { ...state, isRunning: false }
      case 'nollaa':
        return { isRunning: false, time: 0 }
      case 'tick':
        return { ...state, time: state.time + 1 }
      default:
        throw new Error()
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)
  const timerId = useRef(null)

  const FormattedTime = () => {
    const secondsInt = parseInt(state.time, 10)
    const hours = String(Math.floor(secondsInt / 3600))
    const minutes = String(Math.floor((secondsInt / 60) % 60))
    const seconds = String(secondsInt % 60)
  
    return <Text style={styles.time}>{hours.padStart(2, '0')}.{minutes.padStart(2, '0')}.{seconds.padStart(2, '0')}</Text>
  }
  

  useEffect(() => {
    if (!state.isRunning) return

    timerId.current = setInterval(() => dispatch({ type: 'tick' }), 1000)
    return () => {
      clearInterval(timerId.current)
      timerId.current = null
    }
  }, [state.isRunning])

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
    <View style={styles.container}>
      <FormattedTime />
      <View style= {styles.buttons} >
      <Button style={styles.button} title="ALOITA" onPress={() => dispatch({ type: 'aloita' })} />
      <Button style={styles.button} title="LOPETA" onPress={() => dispatch({ type: 'lopeta' })} />
      <Button style={styles.button} title="NOLLAA" onPress={() => dispatch({ type: 'nollaa' })} />
    </View>
    </View>
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
