/**
 * iOS 퍼미션 리턴 값
 */
export const PERMISSION_IOS_STATUS = Object.freeze({
    NotDetermined: 'notDetermined',
    Restricted: 'restricted',
    Denied: 'denied',
    Authorized: 'authorized',
    Limited: 'limited', /** ios 14 이상부터 체크 가능. 모든 퍼미션에 존재하지 않으며, 특정 퍼미션(예; 사진 앨범 접근)에서만 리턴값으로 받아올 수 있다. */
  } as const);
  

/**
 * iOS 퍼미션 종류
 */
export const PERMISSION_IOS_TYPES = Object.freeze({
    PhotoLibrary: 'PhotoLibrary',//'PHAuthorizationStatus',
    PhotoLibraryAdditions: 'PhotoLibraryAdditions',
    Camera: 'Camera',//'AVAuthorizationStatus', //AVMediaTypeVideo
    Audio: 'Audio',//'AVAuthorizationStatus', //AVMediaTypeAudio
} as const);
