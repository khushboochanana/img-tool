import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons, Entypo } from '@expo/vector-icons';


export default class ImagePickerButton extends React.Component {
    render() {
        const { iconSize = 40, pickImage } = this.props
        return (
            <TouchableOpacity
                style={styles.imagePicker}
                onPress={() => pickImage()}>
                <Entypo
                    name="images"
                    style={{ color: "#6e61ed", fontSize: iconSize }}
                />
            </TouchableOpacity>)
    }


}
const styles = StyleSheet.create({
    imagePicker: {
        alignSelf: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
});
