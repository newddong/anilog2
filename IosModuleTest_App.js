import React, { Component } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import CameraRoll from './src/module/CameraRoll.js';
import PermissionIos from './src/module/PermissionIos';
import { PERMISSION_IOS_STATUS, PERMISSION_IOS_TYPES } from './src/module/PermissionIosStatics';


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


export default class App extends Component {
  constructor() {
    super();
    this.state = {
      image: null,
      images: null,
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

    CameraRoll.compressImage(this.state.image.uri, 160, 240, 0.5)
    .then(r => {
      console.log(r);
      this.setState({
        image: {
          uri: r,
          width: 10,
          height: 500,
        },
        images: null,
      });
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
      assetType: 'Photos',
      include: ['imageSize', 'filename', 'filesize'],
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

  cleanupImages() {
    CameraRoll.clean()
      .then(() => {
        console.log('removed tmp images from tmp directory');
      })
      .catch((e) => {
        alert(e);
      });
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
          onPress={() => this.checkPermission(false)}
          style={styles.button}>
          <Text style={styles.text}>Ask permission / Check Permission</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.getImage(3, 0)}
          style={styles.button}>
          <Text style={styles.text}>getImage</Text>
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
            CameraRoll.saveImage(this.state.image.uri)
            .catch(err => {
              console.log(err);
            });
            //save queue 추가하고 대기 중 ui 변경되는지 테스트용도 (현재 save loop 주석처리힘)
            // this.getImage(5, 4);
          }}
          style={styles.button}>
          <Text style={styles.text}>save selected Image</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            test++;
            console.log(test);
            this.compress();
          }}
          style={styles.button}>
          <Text style={styles.text}>compress selected Image</Text>
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