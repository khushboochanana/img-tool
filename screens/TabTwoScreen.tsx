import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements'
import { Text, View } from '../components/Themed';

export default class TabTwoScreen extends React.Component {
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
        <View style={styles.top}></View>
        <View style={styles.bottom}></View>
        {
          collections.map((col, index) => {
            return (
              <View style={styles.colContainer}>
                <View style={styles.innerContainer}>
                  <View style={styles.titleView}>
                    <Text style={styles.title} >
                      {col.title}
                    </Text>
                  </View>
                  {collections.map((col, index) => {
                    return (
                      <TouchableOpacity
                        onPress={() => this.getCollection(col)}
                        style={styles.collection}
                      >
                        <View style={styles.colView}                  >

                        </View>
                      </TouchableOpacity>
                    )
                  })}

                </View>
              </View>
            )

          })
        }

      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '80%'
  },
  top: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 0,
    backgroundColor: '#58c592',
  },
  bottom: {
    width: '100%',
    position: 'absolute',
    height: '100%',
    bottom: 0,
    backgroundColor: '#f1f2f4',

  },
  colContainer: {
    height: '30%',
    width: '94%',
    backgroundColor: 'white',
    borderRadius: 20,
    marginVertical: '4%',
    position: 'relative',
    alignItems: 'center',
  },
  innerContainer: {
    height: '30%',
    width: '94%',
    backgroundColor: 'white',
    borderRadius: 20,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: '7%',
  },
  titleView: {
    height: 25,
    width: 200,
    position: 'absolute',
    top: -13,
    left:'25%',
    backgroundColor: 'white',
    borderRadius: 20,
    borderColor: 'grey',
    borderWidth: 1
  },
  title: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#7e57c2',
    width: '90%'
  },
  collection: {
    width: '20%',
    minHeight: 60,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1%',
  },
  colView: {
    width: '100%',
    minHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',


  }
});
