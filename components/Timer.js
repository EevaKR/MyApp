import { View, Text } from 'react-native';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';


  

export default class Timer extends React.Component {
    state = {
        time: 0,
      };

    startTimer = () => {
        this.interval = setInterval(() => {
            this.setState(state => ({
                time: state.time + 1,

            }));
        }, 1000);
    };

    stopTimer = () => {
        clearInterval(this.interval);
    };


    // render() {
    //     return (
    //         <View>
    //             <Text>{this.state.time}</Text>
    //             <TouchableOpacity onPress={this.startTimer}>
    //                 <Text>Start</Text>
    //             </TouchableOpacity>

    //             <TouchableOpacity onPress={this.stopTimer}>
    //                 <Text>Stop</Text>
    //             </TouchableOpacity>
    //         </View>
    //     );
    // }
}