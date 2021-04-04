import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons, Entypo } from '@expo/vector-icons';


export default class CaptureButton extends React.Component {

    render() {
        const { takePicture, iconSize = 40 } = this.props
        return (
            <TouchableOpacity
                style={styles.captureButton}
                onPress={() => takePicture()}
            >
                <FontAwesome
                    name="camera"
                    style={{ color: "#fff", fontSize: iconSize }}
                />
            </TouchableOpacity>)
    }


}
const styles = StyleSheet.create({
    captureButton: {
        alignSelf: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'transparent',
    },
});
