import React from 'react';
import { StyleSheet, Text, View, TextInput, Image, Platform, SafeAreaView, ScrollView } from 'react-native';
import { Fontisto } from '@expo/vector-icons';

import { Button } from 'react-native-elements';
export default class Resize extends React.Component {
    state = {
        value: ''
    }

    async componentDidMount() {
    }

    download = (text: any) => {
    }


    render() {
        const { value } = this.state

        return (
            <View style={styles.container}>

                <Button
                    title="Download"
                    buttonStyle={{ borderColor: '#58c592',backgroundColor: 'white' }}
                    titleStyle={{ color: '#58c592' }}
                    icon={
                        <Fontisto
                            name="download"
                            style={{ ...styles.iconStyle, color: "#58c592", }}
                        />
                    }
                    onPress={this.download}
                    type="outline"
                />

            </View>)
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1, flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '5%'
    },
    iconStyle: {
        fontSize: 20, marginRight: 5,

    },
});
