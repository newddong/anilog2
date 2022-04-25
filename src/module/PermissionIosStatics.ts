export const PERMISSION_IOS_STATUS = Object.freeze({
    NotDetermined: 'notDetermined',
    Restricted: 'restricted',
    Denied: 'denied',
    Authorized: 'authorized',
    Limited: 'limited', /** ios 14 이상부터 체크 가능 */
  } as const);
  
export const PERMISSION_IOS_TYPES = Object.freeze({
    PhotoLibrary: 'PhotoLibrary',//'PHAuthorizationStatus',
    PhotoLibraryAdditions: 'PhotoLibraryAdditions',
    Camera: 'Camera',//'AVAuthorizationStatus', //AVMediaTypeVideo
    Audio: 'Audio',//'AVAuthorizationStatus', //AVMediaTypeAudio
} as const);
