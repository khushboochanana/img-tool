import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { FontAwesome5, FontAwesome, MaterialIcons, Entypo } from '@expo/vector-icons';
import Compress from '../compress'
import Resize from '../resize';
import TextFile from '../textfile';
import SpeakImgText from '../speakImgText';
import ImageToPDF from '../imagetoPdf';

export default class ImgToolList extends React.Component {
    state = {
        value: '',
    }

    async componentDidMount() {
    }

    onChangeText = (text: any) => {
        this.setState({ value: text })
    }


    render() {
        const { images, openCamera, pickImage, imgToolPress, _toggleSubview } = this.props
        let tools = [
            {
                title: 'Compress Image',
                component: <Compress image={images[0]} />,
                icon: <FontAwesome5
                    name="compress"
                    style={{ ...styles.iconStyle, color: "#fca8cb", }}
                />
            },
            {
                title: 'Reize Image',
                component: <Resize image={images[0]} />,
                icon: <Entypo
                    name="resize-100-"
                    style={{ ...styles.iconStyle, color: "#bf6ccf", }}
                />
            },
            {
                title: 'Img to TextFile',
                component: <TextFile image={images[0]} />,
                icon: <Entypo
                    name="text-document"
                    style={{ ...styles.iconStyle, color: "#f7dd69", }}
                />
            },

            {
                title: 'Images To pdf',
                component: <ImageToPDF images={images} _toggleSubview={_toggleSubview} />,
                icon: <FontAwesome5
                    name="file-pdf"
                    style={{ ...styles.iconStyle, color: "#388e3c", }}
                />
            }, {
                title: 'Speak Img Text',
                component: <SpeakImgText image={images[0]} />,
                icon: <MaterialIcons
                    name="speaker-phone"
                    style={{ ...styles.iconStyle, color: "#ef5350", }}
                />
            },
        ]

        return (<View >
            {
                tools.map((tool: any, index: number) => {
                    return <Collapse onToggle={imgToolPress} key={index} style={{ margin: 1, borderBottomWidth: 1, borderColor: '#7564f638', poition: 'absolute', zIndex: 0 }}>
                        <CollapseHeader style={styles.header}>
                            {tool.icon}
                            <Text style={styles.labelStyle}>{tool.title}</Text>
                        </CollapseHeader>
                        <CollapseBody style={styles.body}>
                            {images && images.length ?
                                <View>
                                    {tool.component}
                                </View>
                                : < View style={{ flexDirection: 'row', margin: '2%' }} >
                                    <TouchableOpacity
                                        style={styles.imagePicker}
                                        onPress={pickImage}>
                                        <Entypo
                                            name="images"
                                            style={{ color: "#7e57c2", fontSize: 20 }}
                                        />
                                    </TouchableOpacity>
                                    <Text>  Please select an Image  </Text>

                                    <TouchableOpacity
                                        style={styles.cameraSwitch}
                                        onPress={openCamera}
                                    >
                                        <FontAwesome
                                            name="camera"
                                            style={{ color: "#fff", fontSize: 20 }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            }
                        </CollapseBody>
                    </Collapse>
                })
            }


        </View >
        )
    }

}

const styles = StyleSheet.create({
    header: {
        flex: 1, padding: 4, flexDirection: 'row', padding: 10, backgroundColor: '#f1f2f4'
    },
    body: {
        alignItems: 'center', justifyContent: 'center', flexDirection: 'row', backgroundColor: '#f1f2f4'
    },
    iconStyle: {
        fontSize: 20, marginRight: 20,

    },
    labelStyle: {
        fontSize: 18,
        color: '#202125',
        fontFamily: 'sans-serif-light'

    },
    imagePicker: {
        alignSelf: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    cameraSwitch: {
        alignSelf: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },

});
