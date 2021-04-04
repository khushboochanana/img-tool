import React from 'react';
import { StyleSheet, Text, View, TextInput, Image, Platform, SafeAreaView, ScrollView, TouchableHighlightComponent } from 'react-native';
import { FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons, Entypo } from '@expo/vector-icons';
import { Button } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';

import { compressImage } from '../../services/compress'
export default class Compress extends React.Component {
    state = {
        width: 100,
        height: 100
    }

    async componentDidMount() {
    }

    setWidth = (width: number) => {
        this.setState({ width })
    }
    setHeight = (height: number) => {
        this.setState({ height })
    }

    resize = async () => {
        const { image } = this.props
        let res = await compressImage({ image, width: 200, height: 333 })
        console.log(res, "??????????????????????????")
    }


    render() {
        const { width, height } = this.state

        return (
            <View style={styles.container}>
                <View>
                    <TextInput
                        style={{ height: 40, width: 100, backgroundColor: '#fafafa' }}
                        placeholder={"  Width"}
                        onChangeText={text => this.setWidth(text)}
                        value={width}
                    />
                </View>
                <View style={{}} >
                    <TextInput
                        style={{ height: 40, width: 100, backgroundColor: '#fafafa' }}
                        placeholder={"  Height"}
                        onChangeText={text => this.setHeight(text)}
                        value={height}
                    />
                </View>
                <View>
                    <Button
                        title="Done"
                        buttonStyle={{ borderColor: '#58c592',backgroundColor: 'white'}}
                        titleStyle={{color:'#58c592'}}
                        onPress={this.resize}
                        type="outline"
                    />
                </View>
            </View>)
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1, flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '5%'
    }
});
