import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements'
import { Text, View } from '../components/Themed';

export default class MediaLibrary extends React.Component {
  getCollection = (col) => {
    console.log(col)
  }

  render() {

    let collections = [
      { title: "Pdf", files: [] },
      { title: "Compressed Images", files: [] },
      { title: "Resize Images", files: [] },
      { title: "Image Text files", files: [] }
    ]
    let collectionview = [];
    for (let i = 0; i < collections.length; i++) {
      collectionview.push(<View></View>)
    }
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>

          {
            collections.map((col, index) => {
              return (
                <TouchableOpacity
                  onPress={() => this.getCollection(col)}
                  style={styles.collection}
                >
                  <View style={styles.colView}                  >
                    <Text style={styles.title}>
                      {col.title}
                    </Text>
                  </View>
                </TouchableOpacity>)

            })
          }
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#58c592'
  },
  innerContainer: {
    position: 'absolute',
    height: '80%',
    bottom: 0,
    width: '94%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: '7%'


  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#7e57c2',
    width: '90%'
  },
  collection: {
    width: '48%',
    minHeight: 160,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1%',
  },
  colView: {
    width: '100%',
    minHeight: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',


  }
});
