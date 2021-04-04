import React from 'react';
import { StyleSheet, Text, View, TextInput, Image, Platform, SafeAreaView, ScrollView } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';

import { Button } from 'react-native-elements';
export default class Resize extends React.Component {
    state = {
        showPause: false
    }

    async componentDidMount() {
    }

    play = (text: any) => {
        this.setState({ showPause: true })
        var thingToSay = 'Good Morning';
        Speech.speak(thingToSay);
    }


    pause = () => {
        this.setState({ showPause: false })
        Speech.pause()
    }
    render() {
        const { showPause } = this.state

        return (
            <View style={styles.container}>

                {showPause ?
                    <Button
                        title="Pause"
                        buttonStyle={{ borderColor: '#6e61ed' }}
                        titleStyle={{ color: '#6e61ed' }}
                        icon={
                            <MaterialCommunityIcons
                                name="pause-octagon"
                                style={{ ...styles.iconStyle, color: "#6e61ed", }}
                            />
                        }
                        onPress={this.pause}
                        type="outline"
                    /> :
                    <Button
                        title="Play"
                        buttonStyle={{ borderColor: '#58c592', backgroundColor: 'white' }}
                        titleStyle={{ color: '#58c592' }}
                        icon={
                            <MaterialIcons
                                name="speaker-phone"
                                style={{ ...styles.iconStyle, color: "#58c592", transform: [{ rotateZ: '90deg' }] }}
                            />
                        }
                        onPress={this.play}
                        type="outline"
                    />

                }

            </View>)
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '5%'
    },
    iconStyle: {
        fontSize: 20, marginRight: 5,

    },
});
