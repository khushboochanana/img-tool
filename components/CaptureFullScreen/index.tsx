import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons, Entypo } from '@expo/vector-icons';


export default class CaptureFullScreen extends React.Component {

    render() {
        const { iconSize = 40, toggleFullScreen } = this.props
        return (
            <TouchableOpacity
                style={styles.captureScreen}
                onPress={() => toggleFullScreen(true)}
            >

                <Text style={{ color: "#fff", fontSize: 20 }}> Capture Full Screen</Text>
                <MaterialCommunityIcons
                    name="fullscreen"
                    style={{ color: "#fff", fontSize: iconSize }}
                />
            </TouchableOpacity>)
    }


}
const styles = StyleSheet.create({
    captureScreen: {
        alignSelf: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'transparent',
    },
});
