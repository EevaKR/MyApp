import { View, Text, Button, Image } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { StyleSheet } from 'react-native'
import { useReducer, useRef, useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import { initializeApp } from 'firebase/app';

export default function TimerPage(button, formattedtime,navigation) {

    // useLayoutEffect(() => {
    //     navigation.setOptions({
    //         headerStyle: {
    //             backgroundColor: '#FB8DA0'
    //         }
    //     })
    // }, [])
    //setOptions ei toimi vielä

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

    const [url, setUrl] = useState();

    useEffect(() => {
        const func = async () => {
            const storage = getStorage();
            const reference = ref(storage, '/cute-tooth-characters-feel-bad-flat-style-unhealthy-teeth-plaque-caries-holes_153905-276.jpg');
            await getDownloadURL(reference)
                .then((x) => {
                    setUrl(x);
                })
        }

        if (url == undefined) { func() };
    }, []);


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


    ///aika laskee 2min nollaan ja sit tulee iloinen hymy
    return (
        <View>
            <Image
                style={styles.image}
                source={{ uri: url }}
            />
            <FormattedTime />
            <View style={styles.buttons}>
                <Button style={styles.button} title="ALOITA" onPress={() => dispatch({ type: 'aloita' })} />
                <View style={styles.space} />
                <Button style={styles.button} title="LOPETA" onPress={() => dispatch({ type: 'lopeta' })} />
                <View style={styles.space} />
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
    space: {
        width: 20, 
        height: 20,
    },
    button: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 30,
        backgroundColor: '#FB8DA0',
        color: '#EFEBE0',
        borderRadius: 30, // Make the buttons more round
        textShadowColor: '#FB8DA0'
    },

    buttons: {
        backgroundColor: '#FB8DA0',
        padding: 50,
        borderRadius: 30, // Make the buttons more round
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 30, // Add space between the buttons
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 20,
        elevation: 50,
    },

    time: {
        color: '#EFEBE0',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 40,
        backgroundColor: '#FB8DA0',
        borderRadius: 30,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 30,
        elevation: 30,
        padding: 20,
    },
    image: {
        borderBottomRightRadius: 20,
        height: 360,
        width: 395,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 'auto',
        marginBottom: 'auto',
    }
});
