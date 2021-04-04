import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Dimensions,
    Platform,
    Button
} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';

import CameraRoll from "@react-native-community/cameraroll";

import * as FileSystem from 'expo-file-system';
import ImageTile from './ImageTile';
const { width } = Dimensions.get('window')

export default class ImageBrowser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photos: [],
            selected: {},
            after: null,
            has_next_page: true
        }
    }

    async componentDidMount() {
        const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
        const permission = await Permissions.getAsync(Permissions.READ_EXTERNAL_STORAGE);

        if (permission.status !== 'granted') {
            const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (newPermission.status === 'granted') {
                //its granted.
            }
        } else {
            await this.getPhotos()
        }
    }

    selectImage = (index) => {
        let newSelected = { ...this.state.selected };
        if (newSelected[index]) {
            delete newSelected[index];
        } else {
            newSelected[index] = true
        }
        if (Object.keys(newSelected).length > this.props.max) return;
        if (!newSelected) newSelected = {};
        this.setState({ selected: newSelected })
    }

    getPhotos = async () => {
        let params = { first: 50, assetType: 'Photos' };
        if (this.state.after) params.after = this.state.after
        if (Platform.OS === 'ios') params.groupTypes = 'All'
        if (!this.state.has_next_page) return
        console.log(params)
        const {
            assets: images,
            ...pageInfo
        } = await MediaLibrary.getAssetsAsync({
            ...params,
        });
        // console.log(images)
        // if (this.state.after === pageInfo.endCursor) return;
        // this.setState({
        //     photos: [...this.state.photos, ...images],
        //     after: pageInfo.endCursor,
        //     has_next_page: pageInfo.hasNextPage
        // });

        // CameraRoll
        //     .getPhotos({ first: 50, assetType: 'Photos' })
        //     .then(this.processPhotos)
    }

    getItemLayout = (data, index) => {
        let length = width / 4;
        return { length, offset: length * index, index }
    }

    prepareCallback() {
        let { selected, photos } = this.state;
        let selectedPhotos = photos.filter((item, index) => {
            return (selected[index])
        });
        let files = selectedPhotos
            .map(i => FileSystem.getInfoAsync(i, { md5: true }))
        let callbackResult = Promise
            .all(files)
            .then(imageData => {
                return imageData.map((data, i) => {
                    return { file: selectedPhotos[i], ...data }
                })
            })
        this.props.callback(callbackResult)
    }

    renderHeader = () => {
        let selectedCount = Object.keys(this.state.selected).length;
        let headerText = selectedCount + ' Selected';
        if (selectedCount === this.props.max) headerText = headerText + ' (Max)';
        return (
            <View style={styles.header}>
                <Button
                    title="Exit"
                    onPress={() => this.props.callback(Promise.resolve([]))}
                />
                <Text>{headerText}</Text>
                <Button
                    title="Choose"
                    onPress={() => this.prepareCallback()}
                />
            </View>
        )
    }
    renderImageTile = ({ item, index }) => {
        let selected = this.state.selected[index] ? true : false
        return (
            <ImageTile
                item={item}
                index={index}
                selected={selected}
                selectImage={this.selectImage}
            />
        )
    }
    renderImages() {
        return (
            <FlatList
                data={this.state.photos}
                numColumns={4}
                renderItem={this.renderImageTile}
                keyExtractor={(_, index) => index}
                onEndReached={() => { this.getPhotos() }}
                onEndReachedThreshold={0.5}
                ListEmptyComponent={<Text>Loading...</Text>}
                initialNumToRender={24}
                getItemLayout={this.getItemLayout}
            />
        )
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderHeader()}
                {this.renderImages()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 50,
        width: width,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginTop: 20
    },
})