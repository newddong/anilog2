import React, { Component } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import CameraRoll from './src/module/CameraRoll.js';
import PermissionIos from './src/module/PermissionIos';
import { PERMISSION_IOS_STATUS, PERMISSION_IOS_TYPES } from './src/module/PermissionIosStatics';
// import VideoEditor from 'Root/module/VideoEditor.js';
import {VESDK, Tool, Configuration, ForceTrimMode, CanvasAction, VideoCodec} from 'react-native-videoeditorsdk';

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

// VESDK.unlockWithLicense(require('vesdk_license.ios.json'));
VESDK.unlockWithLicense(require('vesdk_license.android.json'));

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      image: null,
      images: null,
      duration: 0,
      uri: null
    };
  }

  getImage(maxLoadImage = 3, whichIndexImage = 0){
    CameraRoll.getPhotos({
      first: maxLoadImage,
      assetType: 'All',
      include: ['imageSize', 'filename', 'filesize', 'playableDuration'],
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

  cleanupImages() {
    CameraRoll.clean()
      .then(() => {
        console.log('removed tmp images from tmp directory');
      })
      .catch((e) => {
        alert(e);
      });
  }

  getVideoAttributes(uri = this.state.image.uri){
    CameraRoll.getVideoAttributes(uri)
    .then(r => {
      this.setState({
        image: null,
        images: null,
        duration: r[0].duration,
        uri: r[0].uri
      });
    })
    .catch(e => {
      alert(e);
    })
  }

  openVideoEditorAndroid(duration = 2, bitRate = 30, filename = 'temp'){
	let configuration = {
		mainCanvasActions: [CanvasAction.SOUND_ON_OFF],
		// tools: [],
		trim: {
			minimumDuration: duration,
			maximumDuration: duration,
			forceMode: ForceTrimMode.ForceTrimMode,
		},
		export: {
		video: {
			codec: VideoCodec.H264,
			// quality: 0.5,
			bitRate: bitRate,
		},
		//cameraroll과 동일한 폴더명. 폴더 내 파일을 지우려면 카메라롤의 clean 함수를 쓰면 된다.
		// filename: 'anilog_temp/' + filename,
		}
	};
	
	VESDK.openEditor('file:///storage/emulated/0/Gallery/앨범_1/20220615_181540.mp4', configuration)
	.then(r => {
		console.log(r);
	})
	.catch(e => {
		console.log(e);
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
          onPress={() => this.getImage(34, 18)}
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
            console.log("image uri::::");
            console.log(this.state.image.uri);
          }}
          style={styles.button}>
          <Text style={styles.text}>console log uri</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            // this.openVideoEditor(15, 30, 'edit');
			this.openVideoEditorAndroid(2, 30, 'temp');
          }}
          style={styles.button}>
          <Text style={styles.text}>openEditor</Text>
        </TouchableOpacity>
    

        <TouchableOpacity
          onPress={() => this.cleanupImages()}
          style={styles.button}>
          <Text style={styles.text}>clean temp images</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
