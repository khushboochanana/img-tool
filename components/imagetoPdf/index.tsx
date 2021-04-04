import * as React from 'react';
import {

    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Image,
    ScrollView
} from 'react-native';
import { Button } from 'react-native-elements';


export default class ImageToPDF extends React.Component {
    constructor(props) {
        super(props);

    }
    createPdf = () => {

    }
    renderImage(item, i) {
        return (
            <Image
                style={{ height: 50, width: 50 ,margin:2}}
                source={{ uri: item.uri }}
                key={i}
            />
        )
    }
    render() {


        return (
            <View style={styles.container}>
                <ScrollView style={{ flex: 1, maxHeight: 100, }}>
                    <View style={{ flexDirection: 'row'}}>
                        {this.props.images.map((item, i) => this.renderImage(item, i))}
                    </View>
                </ScrollView>
                <View style={styles.subView}>
                    <Button
                        title="Select More Images"
                        buttonStyle={{ borderColor: '#6e61ed', marginRight: 5, backgroundColor: 'white' }}
                        titleStyle={{ color: '#6e61ed' }}
                        onPress={() => { this.props._toggleSubview(true) }}
                        type="outline"
                    />

                    <Button
                        title="Create PDF"
                        buttonStyle={{ borderColor: '#58c592', backgroundColor: 'white' }}
                        titleStyle={{ color: '#58c592' }}
                        onPress={this.createPdf}
                        type="outline"
                    />
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        padding: 8,
    },
    buttonText: {
        fontSize: 17,
        color: "#007AFF"
    },
    subView: {

        flexDirection: 'row',
        padding: '5%', margin: '2%', backgroundColor: 'white'

    }
});

