import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ActivityIndicator } from 'react-native';
import ImageBrowser from '../../CustomModules/ImageBrowser';

export default class ImageBrowserScreen extends Component {
const 
    imageBrowserCallback = (callback) => {
        callback.then((photos) => {
            console.log(photos)
            this.props.selectImages(photos)
        }).catch((e) => console.log(e))
    }


    render() {
        return (
            <View style={[styles.flex, styles.container]}>

                <Text>Browse imagess</Text>
                <ImageBrowser
                    max={101} // Maximum number of pickable image. default is None
                    headerCloseText={'キャンセル'} // Close button text on header. default is 'Close'.
                    headerDoneText={'　　完了'} // Done button text on header. default is 'Done'.
                    headerButtonColor={'#E31676'} // Button color on header.
                    headerSelectText={'枚の画像を選択中'} // Word when picking.  default is 'n selected'.
                    mediaSubtype={'screenshot'} // Only iOS, Filter by MediaSubtype. default is display all.
                    badgeColor={'#E31676'} // Badge color when picking.
                    emptyText={'選択できる画像がありません'} // Empty Text
                    callback={this.imageBrowserCallback} // Callback functinon on press Done or Cancel Button. Argument is Asset Infomartion of the picked images wrapping by the Promise.
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    flex: {
        flex: 1
    },
    container: {
        position: 'relative'
    },
    emptyStay: {
        textAlign: 'center',
    },
    countBadge: {
        paddingHorizontal: 8.6,
        paddingVertical: 5,
        borderRadius: 50,
        position: 'absolute',
        right: 3,
        bottom: 3,
        justifyContent: 'center',
        backgroundColor: '#0580FF'
    },
    done: {
        alignSelf: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    countBadgeText: {
        fontWeight: 'bold',
        alignSelf: 'center',
        padding: 'auto',
        color: '#ffffff'
    }
});
