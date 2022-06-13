import React, { Component } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import CameraRoll from './src/module/CameraRoll.js';
import PermissionIos from './src/module/PermissionIos';
import { PERMISSION_IOS_STATUS, PERMISSION_IOS_TYPES } from './src/module/PermissionIosStatics';
// import {VESDK, Configuration, Tool, ForceTrimMode, CanvasAction, VideoCodec} from 'react-native-videoeditorsdk';
import VideoEditor from 'Root/module/VideoEditor.js';

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
// VESDK.unlockWithLicense(require('vesdk_license.android.json'));

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

  //이런 식으로 쪼개서 퍼미션을 체크해도 되고
  //PermissionIos.updatePermission(); 을 그대로 불러서 써도 된다
  checkPermission(isCustomized = false){
    if(isCustomized) {
      PermissionIos.checkPermission()
      .then(r => {
        console.log('check permission: %s', r);
        if( r == "notDetermined"){
          PermissionIos.openSetting();
        }
        else if (r != "authorized"){
          PermissionIos.requestPermission();
        }
      })
      .catch(err => {
        console.log(err);
      });
    } else {
      PermissionIos.updatePermission();
    }
  };

  save(){
    if(this.state.image == null){
      console.log('image is null');
      return;
    }

    CameraRoll.saveImage(this.state.image.uri)
    .catch(err => {
      console.log(err);
    });
  }

  
  compress(){
    if(this.state.image == null){
      console.log('image is null');
      return;
    }

    CameraRoll.compressImage({imageFiles: [this.state.image.uri],
     maxHeight: 160, 
     maxWidth: 240, 
     quality:0.5,
     mimeType:"png" })
    .then(r => {
      console.log(r);
    if (r== null || r.assets == null || r. assets.length == 0){
      console.log("assets are nil or length 0");
    } else {
    this.setState({
      image: {
        uri: r.assets[0].uri,
        width: r.assets[0].width,
        height: r.assets[0].height,
      },
      images: null,
      });
    }
    })
    .catch(err => {
      console.log(err);
    })
  }

  //cameraroll에서 이미지 불러오는 건 공식페이지 샘플과 동일, 다만 smart album이 추가되어 있음.
  //관련하여 안내 작성 예정
  getImage(maxLoadImage = 3, whichIndexImage = 0){
    CameraRoll.getPhotos({
      first: maxLoadImage,
      toTime: 0,
      assetType: 'All',
      include: ['imageSize', 'filename', 'filesize', 'playableDuration'],
      groupTypes: 'All',
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

  cropImage(){
    CameraRoll.cropImage({
      destWidth: 1100,
      destHeight: 300,
      offsetX: 500,
      offsetY: 1000,
      uri: this.state.image.uri
    })
    .then(r => {
      this.setState({
        image: {
          uri: r.uri,
          width: r.width,
          height: r.height,
        },
        images: null,
      });
    })
    .catch(err => {
      console.log(err);
    })
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

  openVideoEditor(duration = 5, bitRate = 30, filename = 'temp'){
    VideoEditor.unlockLicense();
    VideoEditor.openVideoEditor(this.state.uri, this.state.duration, duration, bitRate, filename)
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
          onPress={() => this.getImage(35, 30)}
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
            this.openVideoEditor(15, 30, 'edit');
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
