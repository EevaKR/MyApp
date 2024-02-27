import { View, Text, Button, Image } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useReducer, useRef, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';


//kysy opelta mitä tähän pitää laittaa propseiksi!!!!!
export default function Home() {

    return (
        <View style={styles.container}>
            <Image></Image>
            
            <Text style = {styles.text}>EEVA'S HAMMASSOVELLUS</Text>
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

    }
})

