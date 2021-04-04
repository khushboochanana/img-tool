import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons, Entypo } from '@expo/vector-icons';


export default class CameraSwitch extends React.Component {

    render() {
        const { handleCameraType, iconSize = 40 } = this.props
        return (
            <TouchableOpacity
                style={styles.cameraSwitch}
                onPress={() => handleCameraType()}
            >
                <MaterialIcons
                    name="switch-camera"
                    style={{ color: "#58c592", fontSize: iconSize }}
                />
            </TouchableOpacity>)



    }
}
const styles = StyleSheet.create({
    cameraSwitch: {
        alignSelf: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
});
