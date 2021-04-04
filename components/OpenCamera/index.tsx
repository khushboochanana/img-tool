import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons, Entypo } from '@expo/vector-icons';


export default class ExitFullScreen extends React.Component {

    render() {
        const { iconSize = 40, openCamera } = this.props
        return (
            <TouchableOpacity
                style={styles.cameraSwitch}
                onPress={() => openCamera()}
            >
                <FontAwesome
                    name="camera"
                    style={{ color: "#fff", fontSize: iconSize }}
                />
            </TouchableOpacity>)
    }


}
const styles = StyleSheet.create({
    cameraSwitch: {
        alignSelf: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'transparent',
    },
});
