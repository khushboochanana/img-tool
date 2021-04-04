import React from 'react';
import {
  Text,
  View,
  TouchableWithoutFeedback,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  Animated,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

import ImgToolList from '../components/imgToolList'
import FullScreenCamera from '../components/CaptureFullScreen';
import ExitFullScreen from '../components/ExitFullScreen';
import ImagePickerButton from '../components/ImagePickerButton';
import CaptureButton from '../components/CaptureButton';
import CameraSwitch from '../components/CameraSwitch';
import OpenCamera from '../components/OpenCamera';
import ImageBrowser from '../components/ImageBrowser';
import styles from './styles';

export class TabOneScreen extends React.Component {
  state = {
    hasPermission: null,
    cameraType: Camera.Constants.Type.back,
    images: [],
    isHidden: false,
    showCamera: true,
    floatCamera: false,
    fullScreen: false,
    bounceValue: new Animated.Value(300),
  }

  async componentDidMount() {
    this.getPermissionAsync()
  }


  getPermissionAsync = async () => {
    // Camera roll Permission 
    if (Platform.OS === 'ios') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
    // Camera Permission
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasPermission: status === 'granted' });
  }

  openCamera = () => {
    this.setState({
      showCamera: true,
      fullScreen: false,
      floatCamera: false
    })
  }

  handleCameraType = () => {
    const { cameraType } = this.state
    this.setState({
      cameraType:
        cameraType === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back
    })
  }

  takePicture = async () => {
    if (this.camera) {
      let photo: any = await this.camera.takePictureAsync();
      this.setState({ images: [photo], showCamera: false })
    }
  }

  pickImage = async () => {
    let photo: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    this.setState({ images: [photo], showCamera: false })
  }

  toggleFullScreen = (val: any) => {
    this.setState({ fullScreen: val, floatCamera: !val })
  }

  imgToolPress = () => {
    this.setState({ floatCamera: true, fullScreen: false })
  }

  selectImages = (images: any[]) => {
    this.setState({ images: [...this.state.images, ...images] })
    this._toggleSubview(false)
  }
 
  _toggleSubview = (value: any) => {
    this.setState({
      isHidden: value, buttonText: !value ? "Show Subview" : "Hide Subview"
    }, () => {
      let toValue = 300;

      if (this.state.isHidden) {
        toValue = 0;
      }

      Animated.spring(
        this.state.bounceValue,
        {
          useNativeDriver: true,
          toValue: toValue,
          velocity: 3,
          tension: 2,
          friction: 8,
        }
      ).start();
    })

  }
  render() {
    const { isFocused } = this.props;
    const { hasPermission, showCamera, images, floatCamera, fullScreen, bounceValue } = this.state
    if (hasPermission === null) {
      return <View />;
    } else if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <TouchableWithoutFeedback onPress={this._toggleSubview.bind(this, false)} style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
              {showCamera && isFocused
                ?
                <Camera
                  style={floatCamera
                    ? [{ flex: 0.2, }]
                    : [{ flex: 1 }]}
                  type={this.state.cameraType}
                  ref={ref => { this.camera = ref }}
                >

                  <View>
                    {fullScreen ?
                      <ExitFullScreen toggleFullScreen={this.toggleFullScreen} />
                      :
                      <FullScreenCamera toggleFullScreen={this.toggleFullScreen} />
                    }
                  </View>
                  <View style={styles.cameraView}>
                    <ImagePickerButton pickImage={this.pickImage} />
                    <CaptureButton takePicture={this.takePicture} />
                    <CameraSwitch handleCameraType={this.handleCameraType} />
                  </View>
                </Camera>

                : <View style={{ flex: 0.3, backgroundColor: 'black' }}>
                  <View style={styles.cameraView}>
                    <ImagePickerButton pickImage={this.pickImage} />
                    <Image
                      style={{ width: 150, height: 150 }}
                      source={{
                        uri: images[0] && images[0].uri,
                      }}
                    />
                    <OpenCamera openCamera={this.openCamera} />
                  </View>
                </View>
              }

              <SafeAreaView style={fullScreen
                ? {
                  flex: 0.2,
                  marginTop: Constants.statusBarHeight,
                }
                : {
                  flex: 0.8,
                  marginTop: Constants.statusBarHeight,
                }}>
                <ScrollView style={styles.scrollView}>
                  <ImgToolList
                    imgToolPress={this.imgToolPress}
                    images={images}
                    _toggleSubview={this._toggleSubview}
                    openCamera={this.openCamera}
                    pickImage={this.pickImage} />
                </ScrollView>
              </SafeAreaView>

            </View>
            <View >
              <Animated.View
                style={[styles.subView,
                { transform: [{ translateY: bounceValue }] }]}
              >
                <ImageBrowser selectImages={this.selectImages} />
              </Animated.View>
            </View>
          </View>
        </TouchableWithoutFeedback >
      );
    }
  }

}

export default function TabScreen(props) {
  const isFocused = useIsFocused();
  return <TabOneScreen {...props} isFocused={isFocused} />;
}
