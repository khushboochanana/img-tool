import {
  StyleSheet,
} from 'react-native';

export default StyleSheet.create({

  photoview: {
    flex: 1,
  },
  cameraView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 30
  },
  fullScreenView: {
    flex: 1,
    flexDirection: "row-reverse",
    marginTop: '-50%'
  },
  fullScreen: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  scrollView: {
    flex: 1,
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },

  button: {
    padding: 8,
  },
  buttonText: {
    fontSize: 17,
    color: "#007AFF"
  },
  subView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    height: 300,
  }
});
