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

    componentDidMount() {
        this.getPhotos()
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
        const {
            assets: images,
            ...pageInfo
        } = await MediaLibrary.getAssetsAsync({
            ...params,
        });
        if (this.state.after === pageInfo.end_cursor) return;
        this.setState({
            photos: [...this.state.photos, ...images],
            after: pageInfo.endCursor,
            has_next_page: pageInfo.hasNext_page
        });
        this.setState({ images });
        // CameraRoll
        //     .getPhotos({ first: 50, assetType: 'Photos' })
        //     .then(this.processPhotos)
    }

    processPhotos = (r) => {
        if (this.state.after === r.page_info.end_cursor) return;
        let uris = r.edges.map(i => i.node).map(i => i.image).map(i => i.uri)
        this.setState({
            photos: [...this.state.photos, ...uris],
            after: r.page_info.end_cursor,
            has_next_page: r.page_info.has_next_page
        });
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