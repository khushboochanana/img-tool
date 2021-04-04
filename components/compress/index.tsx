import React from 'react';
import { StyleSheet, Text, View, TextInput, } from 'react-native';
import { Button } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';

import { compressImage } from '../../services/compress'
export default class Compress extends React.Component {
    state = {
        value: '',
        type: 'kb'
    }

    async componentDidMount() {
    }

    onChangeText = (text: any) => {
        this.setState({ value: text })
    }
    onChangetype = (item: any) => {

        this.setState({
            type: item.value
        })

    }

    compress = async () => {
        const { image } = this.props
        let res = await compressImage({ image, width: 200, height: 333 })
        console.log(res, "??????????????????????????")
    }


    render() {
        const { value, type } = this.state

        return (
            <View style={styles.container}>
                <View>
                    <TextInput
                        style={{ height: 40, width: 100, backgroundColor: '#fafafa' }}
                        placeholder={"  Enter size"}
                        onChangeText={text => this.onChangeText(text)}
                        value={value}
                    />
                </View>
                <View style={{}} >
                    <DropDownPicker
                        items={[
                            { label: 'GB', value: 'gb', },
                            { label: 'KB', value: 'kb', },
                            { label: 'MB', value: 'mb', },

                        ]}
                        defaultValue={type}
                        containerStyle={{ height: 40, width: 100 }}
                        style={{ backgroundColor: '#fafafa' }}
                        itemStyle={{
                            justifyContent: 'flex-start'
                        }}
                        dropDownStyle={{ backgroundColor: '#fafafa' }}
                        onChangeItem={this.onChangetype}
                    />
                </View>
                <View>
                    <Button
                        title="Done"
                        buttonStyle={{ borderColor: '#58c592',backgroundColor: 'white'}}
                        titleStyle={{color:'#58c592'}}
                       
                        onPress={this.compress}
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
