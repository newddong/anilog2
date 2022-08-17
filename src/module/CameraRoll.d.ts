/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * 
 */
 'use strict';
 import { Platform, NativeModules, Image } from 'react-native';
 
 const RNCCameraRoll  = Platform.OS=='ios'?NativeModules.RNCCameraRoll:NativeModules.PhotoListModule;
 
 const GROUP_TYPES_OPTIONS = {
   Album: 'Album',
   All: 'All', // default
   Event: 'Event',
   Faces: 'Faces',
   Library: 'Library',
   SmartAlbum: 'SmartAlbum',
   PhotoStream: 'PhotoStream',
   SavedPhotos: 'SavedPhotos',
 };
 
 const ASSET_TYPE_OPTIONS = {
   All: 'All',
   Videos: 'Videos',
   Photos: 'Photos',
 };
 
 const ALBUM_TYPE_OPTIONS = {
   All: 'All',
   Album: 'Album',
   SmartAlbum: 'SmartAlbum',
 };

 const SMART_ALBUM_SUBTYPES = [
  "panorama", "파노라마",
  "videos", "비디오",
  "favorites", "즐겨찾는 항목",
  "time-lapse","타임랩스",
  "hidden","가려진 항목",
  "recents","최근 항목",
  "bursts","버스트",
  "slo-mo","슬로 모션",
  "selfies","셀카",
  "screenshots","스크린샷",
  "depth effect","인물 사진",
  "live photos","라이브 포토",
  "animated","움직이는 항목",
  "long exposure",
  "raw"];
 
 export type GroupTypes = keyof typeof GROUP_TYPES_OPTIONS;
 
 export type Include =
   | 'filename'
   | 'fileSize'
   | 'location'
   | 'imageSize'
   | 'playableDuration';
 
 /**
  * Shape of the param arg for the `getPhotos` function.
  */
 export type GetPhotosParams = {
   /**
    * The number of photos wanted in reverse order of the photo application
    * (i.e. most recent first).
    */
   first: number,
 
   /**
    * A cursor that matches `page_info { end_cursor }` returned from a previous
    * call to `getPhotos`
    */
   after?: string,
 
   /**
    * Specifies which group types to filter the results to.
    */
   groupTypes?: GroupTypes,
 
   /**
    * Specifies filter on group names, like 'Recent Photos' or custom album
    * titles.
    */
   groupName?: string,
 
   /**
    * Specifies filter on group subtype, basically for smart albums
    */
  //  subType?: string,
 
   /**
    * Specifies filter on asset type
    */
   assetType?: $Keys<typeof ASSET_TYPE_OPTIONS>,
 
   /**
    * Earliest time to get photos from. A timestamp in milliseconds. Exclusive.
    */
   fromTime?: number,
 
   /**
    * Latest time to get photos from. A timestamp in milliseconds. Inclusive.
    */
   toTime?: Number,
 
   /**
    * Filter by mimetype (e.g. image/jpeg).
    */
   mimeTypes?: Array<string>,
 
   /**
    * Specific fields in the output that we want to include, even though they
    * might have some performance impact.
    */
   include?: Include[],
 };
 
 export type PhotoIdentifier = {
   node: {
     type: string,
     group_name: string,
     image: {
       filename: string | null,
       uri: string,
       height: number,
       width: number,
       fileSize: number | null,
       playableDuration: number,
     },
     timestamp: number,
     location: {
       latitude?: number,
       longitude?: number,
       altitude?: number,
       heading?: number,
       speed?: number,
     } | null,
   },
 };
 
 export type PhotoIdentifiersPage = {
   edges: Array<PhotoIdentifier>,
   page_info: {
     has_next_page: boolean,
     start_cursor?: string,
     end_cursor?: string,
   },
 };

 export type SaveToCameraRollOptions = {
   type?: 'photo' | 'video' | 'auto',
   album?: string,
 };
 
 export type GetAlbumsParams = {
   assetType?: keyof typeof ASSET_TYPE_OPTIONS,
   albumType?: keyof typeof ALBUM_TYPE_OPTIONS,
 };
 
 export type Album = {
   title: string,
   type: string,
   subType: string,
   count: number,
 };

 export type CompressionParams = {
   /**
    * 압축할 이미지 파일의 uri.
    * 포맷은 ph://{local identifier}이다.
    * cameraRoll에서 반환하는 이미지 경로라면 문제없이 작동함
    */
  imageFiles: string[],

  /**
   * 압축 퀄리티. 0 ~ 1 사이의 실수. 미지정 시 디폴트 1
   */
  quality?: number,

  /**
   * 이미지 압축 시 최대 세로 길이. 미지정 시 디폴트 0
   */
  maxHeight?: number,

  /**
   * 이미지 압축 시 최대 가로 길이. 미지정 시 0
   */
  maxWidth?: number,

  /**
   * 이미지 형식. jpg, png만 가능
   * 지정하지 않을 경우 jpg
   */
  mimeType?: string,
};

export type CropParams = {
  /**
   * 이미지 주소
   */
  uri: string,
  /**
   * 바꾸고자 하는 너비 픽셀단위
   */
  destWidth: number, //uint
  /**
   * 바꾸고자 하는 넓이 픽셀단위
   */
  destHeight: number, //uint
  /**
   * 대상의 X오프셋 픽셀단위
   */
  offsetX?: number, //uint, default 0
  /**
   * 대상의 Y오프셋 픽셀단위
   */
  offsetY?: number, // uint, default 0
  /**
   * 회전 각도
   */
  angle?: number, //default 0
  /**
   * 회전 여부
   */
  isCircular?: boolean,//deefault false
}

export type VideoAttributes = {
  uri?: string,  //카메라롤의 ph://{local identifier} 외의 형태 (iOS만 적용. android는 별도 uri 필요 없음)
  duration: number,
}
 
 /**
  * `CameraRoll` provides access to the local camera roll or photo library.
  *
  * See https://facebook.github.io/react-native/docs/cameraroll.html
  */
 class CameraRoll {
   static GroupTypesOptions = GROUP_TYPES_OPTIONS;
   static AssetTypeOptions = ASSET_TYPE_OPTIONS;
   static AlbumTypeOptions = ALBUM_TYPE_OPTIONS;
 
   /**
    * uri 리스트를 넘겨주고 해당 리스트의 uri에 해당하는 파일을 압축
    * @param CompressionParams 압축하기 위한 이미지 주소, 퀄리티 등의 정보
    * @returns 
    */
   static compressImage(params: CompressionParams): Promise<Image[]>{
    return RNCCameraRoll.compressImage(params);
   }

   /**
    * uri에 해당하는 이미지를 크롭, 결과는 promise로 반환
    * @param {CropParams} 크롭하기 위한 이미지 주소, 크기 등의 정보
    * @returns 크롭된 이미지를 반환한다.
    */
   static cropImage(params: CropParams): Promise<Image>{
     return RNCCameraRoll.cropImage(params);
   }

   /**
    * uri에 해당하는 이미지를 저장
    * @param uri 저장하고자 하는 이미지 주소
    * @returns 저장하는 promise를 반환한다.
    */
  static saveImage(uri: string): Promise<void>{
    return RNCCameraRoll.saveImage(uri);
  }

  /**
   * 카메라롤에서 기본적으로 사용되는 파일 주소(ph://{local identifier} 형태)에서 iOS 갤러리 내부에서 통용되는 주소 및 파일 길이를 가져옴
   * @param uri 가져오고자 하는 이미지의 주소
   * @returns iOS에서 기본적으로 통용되는 이미지 주소와 파일 길이를 VideoAttributes 형태로 반환한다
   */
  static getVideoAttributes(uri: string): Promise<VideoAttributes>{
    return RNCCameraRoll.getVideoAttributes(uri);
  }
   
   static getAlbums(
     params: GetAlbumsParams = {
       assetType: ASSET_TYPE_OPTIONS.All,
       albumType: ALBUM_TYPE_OPTIONS.All,
     },
   ): Promise<Album[]> {
     return RNCCameraRoll.getAlbums(params);
   }
 
   static getParamsWithDefaults(params: GetPhotosParams): GetPhotosParams {
     const newParams = { ...params };
     if (!newParams.assetType) {
       newParams.assetType = ASSET_TYPE_OPTIONS.All;
     }
     if (!newParams.groupTypes && Platform.OS !== 'android') {
       newParams.groupTypes = GROUP_TYPES_OPTIONS.All;
     }
     //group name 값이 smart album subtype에 해당하는 경우 smart album 루트 타도록 함
     if(newParams.groupName && Platform.OS == 'ios'){
      if(SMART_ALBUM_SUBTYPES.includes(newParams.groupName)){
        newParams.groupTypes = GROUP_TYPES_OPTIONS.SmartAlbum
      } else {
        newParams.groupTypes = GROUP_TYPES_OPTIONS.Album;
      }
     }
     return newParams;
   }
 
   /**
    * Returns a Promise with photo identifier objects from the local camera
    * roll of the device matching shape defined by `getPhotosReturnChecker`.
    *
    * See https://facebook.github.io/react-native/docs/cameraroll.html#getphotos
    */
   static getPhotos(params: GetPhotosParams): Promise<PhotoIdentifiersPage> {
     params = CameraRoll.getParamsWithDefaults(params);
     const promise = RNCCameraRoll.getPhotos(params);
 
     if (arguments.length > 1) {
       console.warn(
         'CameraRoll.getPhotos(tag, success, error) is deprecated.  Use the returned Promise instead',
       );
       let successCallback = arguments[1];
       const errorCallback = arguments[2] || (() => { });
       promise.then(successCallback, errorCallback);
     }
 
     return promise;
   }
 
   static clean(){
     return RNCCameraRoll.clean();
   }
 }

 export {CameraRoll};
 export default CameraRoll;
