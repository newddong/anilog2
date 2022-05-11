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
   subType?: string,
 
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
  uri: string,
  destWidth: number,
  destHeight: number,
  destScaleX?: number, //default 1
  destScaleY?: number, //default 1
  offsetX?: number, //default 0
  offsetY?: number, // default 0
  angle?: number, //default 0
  isCircular?: boolean,//deefault false
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
    * @param CompressionParams CameraRoll.d.ts 참조
    * @returns 
    */
   static compressImage(params: CompressionParams): Promise<Image[]>{
    return RNCCameraRoll.compressImage(params);
   }

   static cropImage(params: CropParams): Promise<Image>{
     return RNCCameraRoll.cropImage(params);
   }

  static saveImage(uri: string): Promise<void>{
    return RNCCameraRoll.saveImage(uri);
  }
   
   static getAlbums(
     params: GetAlbumsParams = {
       assetType: ASSET_TYPE_OPTIONS.All,
       albumType: ALBUM_TYPE_OPTIONS.Album,
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
