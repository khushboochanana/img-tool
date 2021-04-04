import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons, Entypo } from '@expo/vector-icons';


export default class ExitFullScreen extends React.Component {

    render() {
        const { iconSize = 40, toggleFullScreen } = this.props
        return (
            <TouchableOpacity
                style={styles.captureScreen}
                onPress={() => toggleFullScreen(false)}
            >
                <Text style={{ color: "#fff", fontSize: 20 }}> Exit Full Screen</Text>
                <MaterialCommunityIcons
                    name="fullscreen-exit"
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
        marginTop:'5%'
    },
});
