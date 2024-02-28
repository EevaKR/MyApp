import { View, Text, Button, Image, TouchableHighlight } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useReducer, useRef, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import { AntDesign } from '@expo/vector-icons'
import { getFirestore } from 'firebase/firestore'; // Add this import statement


/// EI TUO KUVAA; MIKÄ ONGELMA???
//NAVIGAATIOSSA MYÖS ONGELMAA, NAVIGAATIONBAR KESKEN JOTEN EI TUO NAVIGATION

//tee liitos timerpage.js:aan 
// tee erillinen styles.js ja importaa se
//lisää image ja sen firestore-jutut,nyt ei näytä kuvaa, yhteys toimii kuitenkin??
//muuta stylesejä mm eri fontti
export default function Home({ navigation }) {

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: ' #FB8DA0'
            },
            headerRight: () => (
                <AntDesign
                    style={styles.navButton}
                    name='arrowright'
                    size={24}
                    onPress={() => navigation.navigate('TimerPage')}
                />
            )
        })
    }, [])

    //const [url, setUrl] = useState('https://firebasestorage.googleapis.com/v0/b/sovellus-c0986.appspot.com/o/tooth-1670434_1920.png?alt=media&token=567a12db-d82b-4fdc-842b-ddd76b90d659');
    const [url, setUrl] = useState()
    useEffect(() => {
        const func = async () => {
            const storage = getFirestore();
            const reference = ref()(storage, '/likainen_hammas.png');
            await getDownloadURL(reference)
                .then((x) => {
                    setUrl(x);
                })
        }
        if (url == undefined) { func() };
    }, [])

    return (
        <View style={styles.container}>
            <Image
                style={{ width: '50%', height: '50%' }}
                source={{ uri: url }}
            />
            <Text style={styles.text}>PEARL APP</Text>
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
    text: {
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

    },
    navButton: {
        container: {
            padding: 10,
            marginRight: 5,
            padding: 4,

        }
    }
})

// puhdas hammas /tooth-1670434_1920.png