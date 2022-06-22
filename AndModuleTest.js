import React, { Component } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import CameraRoll from './src/module/CameraRoll.js';
import VideoEditor from './src/module/VideoEditor.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'blue',
    marginBottom: 10,
  },
  text: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
});

VideoEditor.unlockLicense();

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      image: null,
      images: null,
      duration: 0,  //비디오 테스트용
      uri: null   //비디오 테스트용
    };
  }

  getImage(maxLoadImage = 3, whichIndexImage = 0){
    CameraRoll.getPhotos({
      first: maxLoadImage,
      assetType: 'All',
      include: ['imageSize', 'filename', 'filesize', 'playableDuration'],
      groupName: '앨범_1',  //chn 테스트용
	  toID: '123456789',
    })
      .then(r => {
        if(r.edges.length < whichIndexImage){
          console.log("이미지가 적음");
          return;
        }
        this.setState({
              image: {
                uri: r.edges[whichIndexImage].node.image.uri,
                width: r.edges[whichIndexImage].node.image.width,
                height: r.edges[whichIndexImage].node.image.height,
              },
              images: null,
            });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getVideoAttributes(uri = this.state.image.uri){
    CameraRoll.getVideoAttributes(uri)
    .then(r => {
      this.setState({
        image: null,
        images: null,
        duration: r.duration,
        uri: uri
      });
      console.log(r);
    })
    .catch(e => {
      alert(e);
    })
  }

  scaledHeight(oldW, oldH, newW) {
    return (oldH / oldW) * newW;
  }

  renderImage(image) {
    return (
      <Image
        style={{ width: 300, height: 300, resizeMode: 'contain' }}
        source={image}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.state.image ? this.renderImage(this.state.image) : null}
          {this.state.images
            ? this.state.images.map((i) => (
                <View key={i.uri}>{this.renderImage(i)}</View>
              ))
            : null}
        </ScrollView>

        <TouchableOpacity
          onPress={() => this.getImage(4, 1)}
          style={styles.button}>
          <Text style={styles.text}>getImage</Text>
        </TouchableOpacity>

        <TouchableOpacity
        onPress={() => this.getVideoAttributes(this.state.image.uri)}
          style={styles.button}>
          <Text style={styles.text}>getVideoAttributes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            VideoEditor.openVideoEditor({
              uri: this.state.uri, 
              duration: this.state.duration, 
              minTrimmedDuration: 2,
              maxTrimmedDuration: 2,
              saveName: 'name_delete_test'});
          }}
          style={styles.button}>
          <Text style={styles.text}>openEditor</Text>
        </TouchableOpacity>
      </View>
    );
  }
}