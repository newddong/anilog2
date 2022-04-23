/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
//참고한 포크: https://github.com/valentynberehovyi/react-native-cameraroll

#import <Photos/Photos.h>

#import <React/RCTBridgeModule.h>
#import <React/RCTConvert.h>

@interface RCTConvert (PHFetchOptions)

+ (PHFetchOptions *)PHFetchOptionsFromMediaType:(NSString *)mediaType
                                       fromTime:(NSUInteger)fromTime
                                         toTime:(NSUInteger)toTime;

@end


@interface RNCCameraRollManager : NSObject <RCTBridgeModule>

@property (nonatomic, strong) RCTPromiseResolveBlock resolve;
@property (nonatomic, strong) RCTPromiseRejectBlock reject;

- (void)  image:(UIImage *)image
  didFinishSavingWithError:(NSError *)error
  contextInfo:(void *)contextInfo;
@end
