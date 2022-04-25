

#import <Foundation/Foundation.h>
#import <AVFoundation/AVCaptureDevice.h>
#import <Photos/Photos.h>
#import <React/RCTConvert.h>

#import "RNCPermissionHandler.h"


//MARK: - ENUMs
/*
 * 현재는 기본 요청 퍼미션이 PhotoLibrary로 되어 있음.
 * 향후 Camera / Audio / PhotoLibraryAdditions 추가 예정
 */
typedef NS_ENUM(NSInteger, RNCPermissionTypes){
  RNCPermissionPhotoLibrary = 0,
  RNCPermissionPhotoLibraryAdditions,
  RNCPermissionCamera,
  RNCPermissionAudio
};

typedef NS_ENUM(NSInteger, RNCPHPermissionIosStatus){
  RNCPHPermissionIosStatusNotDetermined = 0,
  RNCPHPermissionIosStatusRestricted,
  RNCPHPermissionIosStatusDenied,
  RNCPHPermissionIosStatusAuthorized,
  RNCPHPermissionIosStatusLimited,// API_AVAILABLE(ios(14)),
};

/*
 * 각 값에 해당하는 문자열은 PermissionIosStatics.ts 파일의 PERMISSION_IOS_STATUS와 동일한 문자열
 * 변경 시 두 파일의 값을 모두 변경하여 서로 다른 값이 되지 않도록 주의
 */
@implementation RCTConvert(PHPermissionIosStatus)
RCT_ENUM_CONVERTER(RNCPHPermissionIosStatus,
                   (@{
                    @"notDetermined":@(RNCPHPermissionIosStatusNotDetermined),
                    @"restricted":@(RNCPHPermissionIosStatusRestricted),
                    @"denied":@(RNCPHPermissionIosStatusDenied),
                    @"authorized":@(RNCPHPermissionIosStatusAuthorized),
                    @"limited":@(RNCPHPermissionIosStatusLimited),
                   }), RNCPHPermissionIosStatusNotDetermined, integerValue)

@end

//MARK: -IosPermissionHandler Module

@implementation RNCPermissionHandler

RCT_EXPORT_MODULE(IosPermissionHandler);

//enum RNCPHPermissionIosStatus를 문자열로 바꾸는 함수
- (NSString *)stringForStatus:(RNCPHPermissionIosStatus)status {
  switch (status) {
    case RNCPHPermissionIosStatusNotDetermined:
      return @"notDetermined";
    case RNCPHPermissionIosStatusRestricted:
      return @"restricted";
    case RNCPHPermissionIosStatusDenied:
      return @"denied";
    case RNCPHPermissionIosStatusAuthorized:
      return @"authorized";
    case RNCPHPermissionIosStatusLimited:
      return @"limited";
  }
}

//PHAuthorizationStatus 를 상단 enum RNCPHPermissionIosStatus에 해당하는 값으로 바꾸어 자바스크립트 단으로 넘겨주는 함수
- (void)switchPHPermissionResolve:(PHAuthorizationStatus)status
                                  resolve:(RCTPromiseResolveBlock)resolve {
  switch (status) {
    case PHAuthorizationStatusAuthorized:
      resolve([self stringForStatus:RNCPHPermissionIosStatusAuthorized]);
      break;
      
    case PHAuthorizationStatusNotDetermined:
      resolve([self stringForStatus:RNCPHPermissionIosStatusNotDetermined]);
      break;
      
    case PHAuthorizationStatusDenied:
      resolve([self stringForStatus:RNCPHPermissionIosStatusDenied]);
      break;
      
    case PHAuthorizationStatusRestricted:
      resolve([self stringForStatus:RNCPHPermissionIosStatusRestricted]);
      break;
      
    case PHAuthorizationStatusLimited:
      resolve([self stringForStatus:RNCPHPermissionIosStatusLimited]);
    break;
  }
}

//설정 창으로 이동하는 함수.
RCT_EXPORT_METHOD(openSetting){
  //UI는 main queue에서만 업데이트 가능
  dispatch_async(dispatch_get_main_queue(), ^{
  [[UIApplication sharedApplication] openURL:[NSURL URLWithString:UIApplicationOpenSettingsURLString]
                                     options: @{}
                                     completionHandler: nil];
  });
}

//퍼미션을 요청하고 해당 요청의 결과값을 리턴한다. reject 대응되어 있지 않음
RCT_EXPORT_METHOD(requestPermission:
                  (RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject){
   if(@available(ios 14, *)){
     [PHPhotoLibrary requestAuthorizationForAccessLevel:PHAccessLevelReadWrite
                                                handler:^(PHAuthorizationStatus status) {
       [self switchPHPermissionResolve:status resolve:resolve];
     }];
  } else {
        [PHPhotoLibrary requestAuthorization:^(PHAuthorizationStatus status) {
          [self switchPHPermissionResolve:status resolve:resolve];
        }];
  }
}

//퍼미션을 체크하고 그에 대한 값을 리턴한다. reject 대응되어 있지 않음
RCT_EXPORT_METHOD(checkPermission:
                  (RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject){
  PHAuthorizationStatus status;
  if( @available(ios 14, *)){
    status = [PHPhotoLibrary authorizationStatusForAccessLevel:PHAccessLevelReadWrite];
  } else {
    status = [PHPhotoLibrary authorizationStatus];
  }
  [self switchPHPermissionResolve:status resolve:resolve];
}


//카메라 퍼미션 작성 중
RCT_EXPORT_METHOD(checkCameraPermission){
  AVAuthorizationStatus status = [AVCaptureDevice authorizationStatusForMediaType:AVMediaTypeVideo];
  
  switch (status){
    case AVAuthorizationStatusAuthorized:

      NSLog(@"Authorized");
    
      break;
      
    case AVAuthorizationStatusNotDetermined:
      NSLog(@"Not determined");
      
      break;
      
    case AVAuthorizationStatusDenied:
      NSLog(@"denied");
      break;
      
    case AVAuthorizationStatusRestricted:
      NSLog(@"restricted");
      break;
    }
  }


@end

