import { View, Text, Button } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { StyleSheet } from 'react-native'
import { useReducer, useRef, useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

export default function TimerPage(button, formattedtime, ) {
    
// useLayoutEffect(() => {
//     navigation.setOptions({
//         headerStyle: {
//             backgroundColor: '#FB8DA0'
//         }
//     })
// }, [])

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




    useEffect(() => {
        if (!state.isRunning) return

        timerId.current = setInterval(() => dispatch({ type: 'tick' }), 1000)
        return () => {
            clearInterval(timerId.current)
            timerId.current = null
        }
    }, [state.isRunning])

    const FormattedTime = () => {
        const secondsInt = parseInt(state.time, 10)
        const hours = String(Math.floor(secondsInt / 3600))
        const minutes = String(Math.floor((secondsInt / 60) % 60))
        const seconds = String(secondsInt % 60)

        return <Text style={styles.time}>{hours.padStart(2, '0')}.{minutes.padStart(2, '0')}.{seconds.padStart(2, '0')}</Text>
    }

    return (

        <View>
            <FormattedTime />
            <View style={styles.buttons} >
                <Button style={styles.button} title="ALOITA" onPress={() => dispatch({ type: 'aloita' })} />
                <Button style={styles.button} title="LOPETA" onPress={() => dispatch({ type: 'lopeta' })} />
                <Button style={styles.button} title="NOLLAA" onPress={() => dispatch({ type: 'nollaa' })} />
            </View>
        </View>
    )
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
