/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "RNCCameraRollManager.h"

#import <CoreLocation/CoreLocation.h>
#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import <Photos/Photos.h>
#import <dlfcn.h>
#import <objc/runtime.h>
#import <MobileCoreServices/UTType.h>

#import <React/RCTBridge.h>
#import <React/RCTConvert.h>
#import <React/RCTLog.h>
#import <React/RCTUtils.h>

//#MARK: PHAssetCollectionSubtype
@implementation RCTConvert (PHAssetCollectionSubtype)

RCT_ENUM_CONVERTER(PHAssetCollectionSubtype, (@{
  @"album": @(PHAssetCollectionSubtypeAny),
  @"all": @(PHAssetCollectionSubtypeSmartAlbumUserLibrary),
  @"event": @(PHAssetCollectionSubtypeAlbumSyncedEvent),
  @"faces": @(PHAssetCollectionSubtypeAlbumSyncedFaces),
  @"library": @(PHAssetCollectionSubtypeSmartAlbumUserLibrary),
  @"photo-stream": @(PHAssetCollectionSubtypeAlbumMyPhotoStream), // incorrect, but legacy
  @"photostream": @(PHAssetCollectionSubtypeAlbumMyPhotoStream),
  @"saved-photos": @(PHAssetCollectionSubtypeAny), // incorrect, but legacy correspondence in PHAssetCollectionSubtype
  @"savedphotos": @(PHAssetCollectionSubtypeAny), // This was ALAssetsGroupSavedPhotos, seems to have no direct correspondence in PHAssetCollectionSubtype
}), PHAssetCollectionSubtypeAny, integerValue)


@end

//#MARK: PHFetchOptions
@implementation RCTConvert (PHFetchOptions)

+ (PHFetchOptions *)PHFetchOptionsFromMediaType:(NSString *)mediaType
                                       fromTime:(NSUInteger)fromTime
                                         toTime:(NSUInteger)toTime
{
  // This is not exhaustive in terms of supported media type predicates; more can be added in the future
  NSString *const lowercase = [mediaType lowercaseString];
  NSMutableArray *format = [NSMutableArray new];
  NSMutableArray *arguments = [NSMutableArray new];
  
  if ([lowercase isEqualToString:@"photos"]) {
    [format addObject:@"mediaType = %d"];
    [arguments addObject:@(PHAssetMediaTypeImage)];
  } else if ([lowercase isEqualToString:@"videos"]) {
    [format addObject:@"mediaType = %d"];
    [arguments addObject:@(PHAssetMediaTypeVideo)];
  } else {
    if (![lowercase isEqualToString:@"all"]) {
      RCTLogError(@"Invalid filter option: '%@'. Expected one of 'photos',"
                  "'videos' or 'all'.", mediaType);
    }
  }
  
  if (fromTime > 0) {
    NSDate* fromDate = [NSDate dateWithTimeIntervalSince1970:fromTime/1000];
    [format addObject:@"creationDate > %@"];
    [arguments addObject:fromDate];
  }
  if (toTime > 0) {
    NSDate* toDate = [NSDate dateWithTimeIntervalSince1970:toTime/1000];
    [format addObject:@"creationDate <= %@"];
    [arguments addObject:toDate];
  }
  
  // This case includes the "all" mediatype
  PHFetchOptions *const options = [PHFetchOptions new];
  if ([format count] > 0) {
    options.predicate = [NSPredicate predicateWithFormat:[format componentsJoinedByString:@" AND "] argumentArray:arguments];
  }
  return options;
}

@end

@implementation RNCCameraRollManager

RCT_EXPORT_MODULE(RNCCameraRoll)

@synthesize bridge = _bridge;

static NSString *const kErrorUnableToSave = @"E_UNABLE_TO_SAVE";
static NSString *const kErrorUnableToLoad = @"E_UNABLE_TO_LOAD";

static NSString *const kErrorAuthRestricted = @"E_PHOTO_LIBRARY_AUTH_RESTRICTED";
static NSString *const kErrorAuthDenied = @"E_PHOTO_LIBRARY_AUTH_DENIED";

static NSString *const tempDirectoryPath = @"anilog_temp/";
static NSString *const albumName = @"Anilog";

typedef void (^PhotosAuthorizedBlock)(void);

//#MARK: requestPhotoLibraryAccess
static void requestPhotoLibraryAccess(RCTPromiseRejectBlock reject, PhotosAuthorizedBlock authorizedBlock) {
  PHAuthorizationStatus authStatus = [PHPhotoLibrary authorizationStatus];
  if (authStatus == PHAuthorizationStatusRestricted) {
    reject(kErrorAuthRestricted, @"Access to photo library is restricted", nil);
  } else if (authStatus == PHAuthorizationStatusAuthorized) {
    authorizedBlock();
  } else if (authStatus == PHAuthorizationStatusNotDetermined) {
    [PHPhotoLibrary requestAuthorization:^(PHAuthorizationStatus status) {
      requestPhotoLibraryAccess(reject, authorizedBlock);
    }];
  } else {
    reject(kErrorAuthDenied, @"Access to photo library was denied", nil);
  }
}

//#MARK: saveToCameraRoll
RCT_EXPORT_METHOD(saveToCameraRoll:(NSURLRequest *)request
                  options:(NSDictionary *)options
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
  // We load images and videos differently.
  // Images have many custom loaders which can load images from ALAssetsLibrary URLs, PHPhotoLibrary
  // URLs, `data:` URIs, etc. Video URLs are passed directly through for now; it may be nice to support
  // more ways of loading videos in the future.
  __block NSURL *inputURI = nil;
  __block PHFetchResult *photosAsset;
  __block PHAssetCollection *collection;
  __block PHObjectPlaceholder *placeholder;
  
  void (^saveBlock)(void) = ^void() {
    // performChanges and the completionHandler are called on
    // arbitrary threads, not the main thread - this is safe
    // for now since all JS is queued and executed on a single thread.
    // We should reevaluate this if that assumption changes.
    
    [[PHPhotoLibrary sharedPhotoLibrary] performChanges:^{
      PHAssetChangeRequest *assetRequest ;
      if ([options[@"type"] isEqualToString:@"video"]) {
        assetRequest = [PHAssetChangeRequest creationRequestForAssetFromVideoAtFileURL:inputURI];
      } else {
        NSData *data = [NSData dataWithContentsOfURL:inputURI];
        UIImage *image = [UIImage imageWithData:data];
        assetRequest = [PHAssetChangeRequest creationRequestForAssetFromImage:image];
      }
      
      placeholder = [assetRequest placeholderForCreatedAsset];
      if (![options[@"album"] isEqualToString:@""]) {
        photosAsset = [PHAsset fetchAssetsInAssetCollection:collection options:nil];
        PHAssetCollectionChangeRequest *albumChangeRequest = [PHAssetCollectionChangeRequest changeRequestForAssetCollection:collection assets:photosAsset];
        [albumChangeRequest addAssets:@[placeholder]];
      }
    } completionHandler:^(BOOL success, NSError *error) {
      if (success) {
        NSString *uri = [NSString stringWithFormat:@"ph://%@", [placeholder localIdentifier]];
        resolve(uri);
      } else {
        reject(kErrorUnableToSave, nil, error);
      }
    }];
  };
  void (^saveWithOptions)(void) = ^void() {
    if (![options[@"album"] isEqualToString:@""]) {
      
      PHFetchOptions *fetchOptions = [[PHFetchOptions alloc] init];
      fetchOptions.predicate = [NSPredicate predicateWithFormat:@"title = %@", options[@"album"] ];
      collection = [PHAssetCollection fetchAssetCollectionsWithType:PHAssetCollectionTypeAlbum
                                                            subtype:PHAssetCollectionSubtypeAny
                                                            options:fetchOptions].firstObject;
      // Create the album
      if (!collection) {
        [[PHPhotoLibrary sharedPhotoLibrary] performChanges:^{
          PHAssetCollectionChangeRequest *createAlbum = [PHAssetCollectionChangeRequest creationRequestForAssetCollectionWithTitle:options[@"album"]];
          placeholder = [createAlbum placeholderForCreatedAssetCollection];
        } completionHandler:^(BOOL success, NSError *error) {
          if (success) {
            PHFetchResult *collectionFetchResult = [PHAssetCollection fetchAssetCollectionsWithLocalIdentifiers:@[placeholder.localIdentifier]
                                                                                                        options:nil];
            collection = collectionFetchResult.firstObject;
            saveBlock();
          } else {
            reject(kErrorUnableToSave, nil, error);
          }
        }];
      } else {
        saveBlock();
      }
    } else {
      saveBlock();
    }
  };
  
  void (^loadBlock)(void) = ^void() {
    inputURI = request.URL;
    saveWithOptions();
  };
  
  requestPhotoLibraryAccess(reject, loadBlock);
}

//#MARK: getAlbums
RCT_EXPORT_METHOD(getAlbums:(NSDictionary *)params
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
  NSString *const mediaType = [params objectForKey:@"assetType"] ? [RCTConvert NSString:params[@"assetType"]] : @"All";
  NSString *const albumType = [params objectForKey:@"albumType"] ? [RCTConvert NSString:params[@"albumType"]] : @"Album";
  
  NSMutableArray * result = [NSMutableArray new];
  NSString *__block fetchedAlbumType = nil;
  
  //콜백함수 선언
  //반환형 (^블록명)(파라미터 타입); void (^blockName)(double, double);
  //- (void)exampleMethodName:(블록 선언이 들어갈 자리인데 생략가능)블록 이름;
  //- (void)exampleMethodName:(void (^blockName)(void))methodBlockName;
  //- (void)exampleMethodName:(void (^)(void))methodBlockName;
  //methodBlockName은 exampleMethodName 함수 안에서 쓸 블록 이름입니다.
  //exampleMethodName 안에서 methodBlockName()으로 호출도 가능합니다.
  void (^convertAsset)(PHAssetCollection * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) =
  ^(PHAssetCollection * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
    PHFetchOptions *const assetFetchOptions = [RCTConvert PHFetchOptionsFromMediaType:mediaType fromTime:0 toTime:0];
    // Enumerate assets within the collection
    PHFetchResult<PHAsset *> *const assetsFetchResult = [PHAsset
                                                         fetchAssetsInAssetCollection:obj
                                                         options:assetFetchOptions];
    //리턴형태
    if (assetsFetchResult.count > 0) {
      [result addObject:@{
        @"title": [obj localizedTitle],
        @"count": @(assetsFetchResult.count),
        @"type": fetchedAlbumType,
        @"subType": @(obj.assetCollectionSubtype)
      }];
    }
  };
  
  PHFetchOptions* options = [[PHFetchOptions alloc] init];
  //album 받아오기
  if ([albumType isEqualToString:@"Album"] || [albumType isEqualToString:@"All"]) {
    fetchedAlbumType = @"Album";
    PHFetchResult<PHAssetCollection *> *const assets = [PHAssetCollection
                                                        fetchAssetCollectionsWithType:PHAssetCollectionTypeAlbum
                                                        subtype:PHAssetCollectionSubtypeAny
                                                        options:options];
    [assets enumerateObjectsUsingBlock:convertAsset];
  }
  //smart album 받아오기
  if ([albumType isEqualToString:@"SmartAlbum"] || [albumType isEqualToString:@"All"]) {
    fetchedAlbumType = @"SmartAlbum";
    PHFetchResult<PHAssetCollection *> *const assets = [PHAssetCollection
                                                        fetchAssetCollectionsWithType:PHAssetCollectionTypeSmartAlbum
                                                        subtype:PHAssetCollectionSubtypeAny
                                                        options:options];
    [assets enumerateObjectsUsingBlock:convertAsset];
  }
  
  resolve(result);
}

//#MARK: RCTResolvePromise

static void RCTResolvePromise(RCTPromiseResolveBlock resolve,
                              NSArray<NSDictionary<NSString *, id> *> *assets,
                              BOOL hasNextPage)
{
  if (!assets.count) {
    resolve(@{
      @"edges": assets,
      @"page_info": @{
        @"has_next_page": @NO,
      }
    });
    return;
  }
  resolve(@{
    @"edges": assets,
    @"page_info": @{
      @"start_cursor": assets[0][@"node"][@"image"][@"uri"],
      @"end_cursor": assets[assets.count - 1][@"node"][@"image"][@"uri"],
      @"has_next_page": @(hasNextPage),
    }
  });
}

//#MARK: getPhotos
RCT_EXPORT_METHOD(getPhotos:(NSDictionary *)params
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
  checkPhotoLibraryConfig();
  
  NSUInteger const first = [RCTConvert NSInteger:params[@"first"]];
  NSString *const afterCursor = [RCTConvert NSString:params[@"after"]];
  NSString *const groupName = [RCTConvert NSString:params[@"groupName"]];
  NSString *const groupTypes = [[RCTConvert NSString:params[@"groupTypes"]] lowercaseString];
  NSString *const mediaType = [RCTConvert NSString:params[@"assetType"]];
  NSUInteger const subType = [RCTConvert NSInteger:params[@"subType"]];
  NSUInteger const fromTime = [RCTConvert NSInteger:params[@"fromTime"]];
  NSUInteger const toTime = [RCTConvert NSInteger:params[@"toTime"]];
  NSArray<NSString *> *const mimeTypes = [RCTConvert NSStringArray:params[@"mimeTypes"]];
  NSArray<NSString *> *const include = [RCTConvert NSStringArray:params[@"include"]];
  
  BOOL __block includeFilename = [include indexOfObject:@"filename"] != NSNotFound;
  BOOL __block includeFileSize = [include indexOfObject:@"fileSize"] != NSNotFound;
  BOOL __block includeLocation = [include indexOfObject:@"location"] != NSNotFound;
  BOOL __block includeImageSize = [include indexOfObject:@"imageSize"] != NSNotFound;
  BOOL __block includePlayableDuration = [include indexOfObject:@"playableDuration"] != NSNotFound;
  
  // Predicate for fetching assets within a collection
  PHFetchOptions *const assetFetchOptions = [RCTConvert PHFetchOptionsFromMediaType:mediaType fromTime:fromTime toTime:toTime];
  // We can directly set the limit if we guarantee every image fetched will be
  // added to the output array within the `collectAsset` block
  BOOL collectAssetMayOmitAsset = !!afterCursor || [mimeTypes count] > 0;
  if (!collectAssetMayOmitAsset) {
    // We set the fetchLimit to first + 1 so that `hasNextPage` will be set
    // correctly:
    // - If the user set `first: 10` and there are 11 photos, `hasNextPage`
    //   will be set to true below inside of `collectAsset`
    // - If the user set `first: 10` and there are 10 photos, `hasNextPage`
    //   will not be set, as expected
    assetFetchOptions.fetchLimit = first + 1;
  }
  assetFetchOptions.sortDescriptors = @[[NSSortDescriptor sortDescriptorWithKey:@"creationDate" ascending:NO]];
  
  BOOL __block foundAfter = NO;
  BOOL __block hasNextPage = NO;
  BOOL __block resolvedPromise = NO;
  NSMutableArray<NSDictionary<NSString *, id> *> *assets = [NSMutableArray new];
  
  BOOL __block stopCollections_;
  NSString __block *currentCollectionName;
  
  requestPhotoLibraryAccess(reject, ^{
    void (^collectAsset)(PHAsset*, NSUInteger, BOOL*) = ^(PHAsset * _Nonnull asset, NSUInteger assetIdx, BOOL * _Nonnull stopAssets) {
      NSString *const uri = [NSString stringWithFormat:@"ph://%@", [asset localIdentifier]];
      NSString *_Nullable originalFilename = NULL;
      PHAssetResource *_Nullable resource = NULL;
      NSNumber* fileSize = [NSNumber numberWithInt:0];
      NSString* path = @"path";
      
      //#MARK: - getphoto
      if (includeFilename || includeFileSize || [mimeTypes count] > 0) {
        // Get underlying resources of an asset - this includes files as well as details about edited PHAssets
        // This is required for the filename and mimeType filtering
        NSArray<PHAssetResource *> *const assetResources = [PHAssetResource assetResourcesForAsset:asset];
        resource = [assetResources firstObject];
        originalFilename = resource.originalFilename;
        fileSize = [resource valueForKey:@"fileSize"];
      }
      
      // WARNING: If you add any code to `collectAsset` that may skip adding an
      // asset to the `assets` output array, you should do it inside this
      // block and ensure the logic for `collectAssetMayOmitAsset` above is
      // updated
      if (collectAssetMayOmitAsset) {
        if (afterCursor && !foundAfter) {
          if ([afterCursor isEqualToString:uri]) {
            foundAfter = YES;
          }
          return; // skip until we get to the first one
        }
        
        
        if ([mimeTypes count] > 0 && resource) {
          CFStringRef const uti = (__bridge CFStringRef _Nonnull)(resource.uniformTypeIdentifier);
          NSString *const mimeType = (NSString *)CFBridgingRelease(UTTypeCopyPreferredTagWithClass(uti, kUTTagClassMIMEType));
          
          BOOL __block mimeTypeFound = NO;
          [mimeTypes enumerateObjectsUsingBlock:^(NSString * _Nonnull mimeTypeFilter, NSUInteger idx, BOOL * _Nonnull stop) {
            if ([mimeType isEqualToString:mimeTypeFilter]) {
              mimeTypeFound = YES;
              *stop = YES;
            }
          }];
          
          if (!mimeTypeFound) {
            return;
          }
        }
      }
      
      // If we've accumulated enough results to resolve a single promise
      if (first == assets.count) {
        *stopAssets = YES;
        stopCollections_ = YES;
        hasNextPage = YES;
        RCTAssert(resolvedPromise == NO, @"Resolved the promise before we finished processing the results.");
        RCTResolvePromise(resolve, assets, hasNextPage);
        resolvedPromise = YES;
        return;
      }
      
      NSString *const assetMediaTypeLabel = (asset.mediaType == PHAssetMediaTypeVideo
                                             ? @"video"
                                             : (asset.mediaType == PHAssetMediaTypeImage
                                                ? @"image"
                                                : (asset.mediaType == PHAssetMediaTypeAudio
                                                   ? @"audio"
                                                   : @"unknown")));
      CLLocation *const loc = asset.location;
      
      [assets addObject:@{
        @"node": @{
          @"type": assetMediaTypeLabel, // TODO: switch to mimeType?
          @"group_name": currentCollectionName,
          @"image": @{
            @"uri": uri,
            @"filename": (includeFilename && originalFilename ? originalFilename : [NSNull null]),
            @"height": (includeImageSize ? @([asset pixelHeight]) : [NSNull null]),
            @"width": (includeImageSize ? @([asset pixelWidth]) : [NSNull null]),
            @"fileSize": (includeFileSize ? fileSize : [NSNull null]),
            @"playableDuration": (includePlayableDuration && asset.mediaType != PHAssetMediaTypeImage
              ? @([asset duration]) // fractional seconds
              : [NSNull null]),
            @"path": path
          },
          @"timestamp": @(asset.creationDate.timeIntervalSince1970),
          @"location": (includeLocation && loc ? @{
            @"latitude": @(loc.coordinate.latitude),
            @"longitude": @(loc.coordinate.longitude),
            @"altitude": @(loc.altitude),
            @"heading": @(loc.course),
            @"speed": @(loc.speed), // speed in m/s
          } : [NSNull null])
        }
      }];
    };
    
    if ([groupTypes isEqualToString:@"all"]) {
      PHFetchResult <PHAsset *> *const assetFetchResult = [PHAsset fetchAssetsWithOptions: assetFetchOptions];
      currentCollectionName = @"All Photos";
      [assetFetchResult enumerateObjectsUsingBlock:collectAsset];
    } else {
      PHFetchResult<PHAssetCollection *> * assetCollectionFetchResult;
      if ([groupTypes isEqualToString:@"smartalbum"]) {
        assetCollectionFetchResult = [PHAssetCollection fetchAssetCollectionsWithType:PHAssetCollectionTypeSmartAlbum subtype:subType options:nil];
        [assetCollectionFetchResult enumerateObjectsUsingBlock:^(PHAssetCollection * _Nonnull assetCollection, NSUInteger collectionIdx, BOOL * _Nonnull stopCollections) {
          PHFetchResult<PHAsset *> *const assetsFetchResult = [PHAsset fetchAssetsInAssetCollection:assetCollection options:assetFetchOptions];
          currentCollectionName = [assetCollection localizedTitle];
          [assetsFetchResult enumerateObjectsUsingBlock:collectAsset];
          
          *stopCollections = stopCollections_;
        }];
      } else {
        PHAssetCollectionSubtype const collectionSubtype = [RCTConvert PHAssetCollectionSubtype:groupTypes];
        
        // Filter collection name ("group")
        PHFetchOptions *const collectionFetchOptions = [PHFetchOptions new];
        collectionFetchOptions.sortDescriptors = @[[NSSortDescriptor sortDescriptorWithKey:@"endDate" ascending:NO]];
        if (groupName != nil) {
          collectionFetchOptions.predicate = [NSPredicate predicateWithFormat:@"localizedTitle = %@", groupName];
        }
        assetCollectionFetchResult = [PHAssetCollection fetchAssetCollectionsWithType:PHAssetCollectionTypeAlbum subtype:collectionSubtype options:collectionFetchOptions];
        [assetCollectionFetchResult enumerateObjectsUsingBlock:^(PHAssetCollection * _Nonnull assetCollection, NSUInteger collectionIdx, BOOL * _Nonnull stopCollections) {
          // Enumerate assets within the collection
          PHFetchResult<PHAsset *> *const assetsFetchResult = [PHAsset fetchAssetsInAssetCollection:assetCollection options:assetFetchOptions];
          currentCollectionName = [assetCollection localizedTitle];
          [assetsFetchResult enumerateObjectsUsingBlock:collectAsset];
          *stopCollections = stopCollections_;
        }];
      } // else of "if ([groupTypes isEqualToString:@"all"])"
    }
    
    // If we get this far and haven't resolved the promise yet, we reached the end of the list of photos
    if (!resolvedPromise) {
      hasNextPage = NO;
      RCTResolvePromise(resolve, assets, hasNextPage);
      resolvedPromise = YES;
    }
  });
}

//#MARK: deletePhotos
RCT_EXPORT_METHOD(deletePhotos:(NSArray<NSString *>*)assets
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
  NSMutableArray *convertedAssets = [NSMutableArray array];
  
  for (NSString *asset in assets) {
    [convertedAssets addObject: [asset stringByReplacingOccurrencesOfString:@"ph://" withString:@""]];
  }
  
  [[PHPhotoLibrary sharedPhotoLibrary] performChanges:^{
    PHFetchResult<PHAsset *> *fetched =
    [PHAsset fetchAssetsWithLocalIdentifiers:convertedAssets options:nil];
    [PHAssetChangeRequest deleteAssets:fetched];
  }
                                    completionHandler:^(BOOL success, NSError *error) {
    if (success == YES) {
      resolve(@(success));
    }
    else {
      reject(@"Couldn't delete", @"Couldn't delete assets", error);
    }
  }
  ];
}

//#MARK: - RCT compressImage
///options로 인자 받는 방식으로 변경 예정. 이미지를 정해진 크기로 변환한다. 세로 기준으로 파일 사이즈를 줄인다.
///현재는 cameraroll에서 리턴받는 ph://{local identifier} 주소로만 동작한다.
///quality는 1.0~0.0
RCT_EXPORT_METHOD(compressImage:(NSDictionary * _Nonnull)params
                  resolver:(RCTPromiseResolveBlock) resolve
                  rejecter:(RCTPromiseRejectBlock) reject){
  NSArray<NSString *>* imageUris = [params objectForKey:@"imageFiles"] ? [RCTConvert NSArray:[params objectForKey:@"imageFiles"]]:@[];
  CGFloat const quality = [params objectForKey:@"quality"] ? [RCTConvert CGFloat:[params objectForKey:@"quality"]]:1;
  CGFloat const maxHeight = [params objectForKey:@"maxHeight"] ? [RCTConvert CGFloat:[params objectForKey:@"maxHeight"]]:0;
  CGFloat const maxWidth = [params objectForKey:@"maxWidth"] ? [RCTConvert CGFloat:[params objectForKey:@"maxWidth"]]:0;
  NSString *const mimeType = [params objectForKey:@"mimeType"] ? [RCTConvert NSString:[params objectForKey:@"mimeType"]]:@"jpg";
  
  //이후 reject 여부 체크에서 errCode length로 판별하므로 빈 스트링 넣어줌
  __block NSString* errCode = @"";
  __block NSString* errMsg;
  
  //enumerateObjectsUsingBlocks가 빈 문자열을 대상으로 순환을 시도할 때 에러가 나므로 위에서 잡아주어야 함
  NSUInteger nUris = imageUris.count;
  for (int i = 0; i < nUris; ++i){
    if(imageUris[i].length == 0) {
      errCode = @"String empty";
      errMsg = @"Uri is an empty string";
      reject(errCode, errMsg, nil);
      return;
    }
  }
  
  __block CGFloat oldWidth = 0;
  __block CGFloat oldHeight = 0;
  __block CGFloat newWidth = 0;
  __block CGFloat newHeight = 0;
  __block NSDictionary * result;
  __block NSMutableArray<NSDictionary *>* assets = [NSMutableArray array];
  
  dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0),^{
    [imageUris enumerateObjectsUsingBlock:^(NSString * _Nonnull uri, NSUInteger idx, BOOL * _Nonnull stop) {
      if (![uri hasPrefix:@"ph://"]) {
        errCode = @"Uri format error";
        errMsg = @"Uri format doesn't fit with photoKit ('ph://')";
        *stop = YES;
        return;
      }
      
      PHFetchResult<PHAsset *> *asset = [PHAsset fetchAssetsWithLocalIdentifiers:@[[uri substringFromIndex:@"ph://".length]] options:nil];
      
      if(asset == nil || asset.count == 0) {
        errCode = @"Nil error";
        errMsg = @"Image fetch result is nil";
        *stop = YES;
        return;
      } else if(asset.firstObject == nil) {
        errMsg = @"Image fetch result is nil";
        *stop = YES;
        return;
      }
      
      oldWidth = asset.firstObject.pixelWidth;
      oldHeight = asset.firstObject.pixelHeight;
      
      if(maxWidth == 0 || maxHeight == 0){
        newHeight = oldHeight;
        newWidth = oldWidth;
      } else {
        if(maxWidth < oldWidth){
          newHeight = (int)((maxWidth / oldWidth) * oldHeight);
          newWidth = maxWidth;
        }
        
        if(maxHeight < oldHeight){
          newWidth = (int)((maxHeight / oldHeight)*oldWidth);
          newHeight = maxHeight;
        }
      }
      
      CGSize newSize = CGSizeMake(newWidth, newHeight);
      PHImageRequestOptions* options = [PHImageRequestOptions new];
      options.synchronous = true;
      [[PHImageManager defaultManager] requestImageForAsset:asset.firstObject
                                                 targetSize:newSize
                                                contentMode:PHImageContentModeAspectFit
                                                    options:options
                                              resultHandler:^(UIImage * _Nullable img, NSDictionary * _Nullable info) {
        if(img == nil){
          errCode = @"Nil error";
          errMsg = @"Image result is nil";
          *stop = YES;
          return;
        }
        
        //압축된 데이터
        //220510 compress시 저장 타입 jpg로 통일
        NSData *imageData = UIImageJPEGRepresentation(img, quality);
//        if([mimeType.lowercaseString isEqualToString:@"jpg"]){
//          imageData = UIImageJPEGRepresentation(img, quality);
//        } else if([mimeType.lowercaseString isEqualToString:@"png"]){
//          imageData = UIImagePNGRepresentation(img);
//        }
        
        NSString* savedPath = [self createTempImage:imageData mimeType:@"jpg"];
        if(savedPath == nil){
          errCode = @"Image save error";
          errMsg = @"Fail to save image";
          *stop = YES;
          return;
        }
        
        NSDictionary* imgRes = @{
          @"uri":savedPath,
          @"fileSize":@([imageData length]),
          @"fileName":savedPath,
          @"type":mimeType,
          @"width":@(newWidth),
          @"height":@(newHeight),
        };
        [assets addObject:imgRes];
      }];
    }];
    
    if(assets == nil || assets.count == 0) {
      reject(errCode, errMsg, nil);
    } else if (errCode.length != 0) {
      reject(errCode, errMsg, nil);
    } else {
      result = @{@"assets":assets};
      resolve(result);
    }
  });
}

//#MARK: @RCT savaeImage
/// 이미지를 저장하는 함수. 성공시 nil, 실패시 error를 리턴한다.
RCT_EXPORT_METHOD(saveImage:(NSString*) uri
                  resolver:(RCTPromiseResolveBlock) resolve
                  rejecter:(RCTPromiseRejectBlock) reject){
  if(uri == nil) {
    reject(@"URI is nil", nil, nil);
    return;
  }
  //!!저장 뒤 메타데이터는 확인하지 않았으므로 아직 확실하지 않은 상태!!
  //!
  __block NSData *imageData = nil;
  __block NSString* mimeType = @"jpg";
  
  void (^save)(void) = ^void() {
    dispatch_async(dispatch_get_global_queue(QOS_CLASS_USER_INITIATED, 0), ^{
      if ([PHAssetCreationRequest class]) {
        [[PHPhotoLibrary sharedPhotoLibrary] performChanges:^{
          [[PHAssetCreationRequest creationRequestForAsset] addResourceWithType:PHAssetResourceTypePhoto
                                                                           data:imageData options:nil];
        } completionHandler:^(BOOL success, NSError * _Nullable error) {
          if (success) {
            resolve(nil);
          } else {
            reject(@"Fail to save image", error.localizedDescription, error);
          }
        }];
      } else {
        //UIImageWriteToSavedPhotosAlbum도 사용 가능하지만 그러면 메타데이터가 전부 날아가기 때문에 임시로 저장한 뒤 카메라 앨범에 저장한다
        NSString* savedPath = [self createTempImage:imageData mimeType:mimeType];
        [[PHPhotoLibrary sharedPhotoLibrary] performChanges:^{
          [PHAssetChangeRequest creationRequestForAssetFromImageAtFileURL:[NSURL URLWithString:savedPath]];
        } completionHandler:^(BOOL success, NSError * _Nullable error) {
          if (success) {
            resolve(nil);
          } else {
            reject(@"Fail to save image", error.localizedDescription, error);
          }
          //임시로 저장했던 파일은 삭제하고 함수 종료
          [[NSFileManager defaultManager] removeItemAtURL:[NSURL URLWithString:savedPath] error:nil];
        }];
      }
    });
  }; //end of block function save()
  
  if([uri hasPrefix:@"ph://"]) //이게 최신 방법
  {
    //err array는 무조건 3 length로 구성하게 해 둠
    NSArray* errorOccured = [self requestImageData:uri
imageRequestResultHandlerOverAPI13:^(NSData * _Nullable resultData, NSString * _Nullable dataUTI, CGImagePropertyOrientation orientation, NSDictionary * _Nullable info) {
      imageData = resultData;
      mimeType = [dataUTI componentsSeparatedByString:@"."].lastObject;
    }
imageRequestResultHandler:^(NSData * _Nullable resultData, NSString * _Nullable dataUTI, UIImageOrientation orientation, NSDictionary * _Nullable info) {
      imageData = resultData;
      mimeType = [dataUTI componentsSeparatedByString:@"."].lastObject;
    }];
    
    if(errorOccured == nil) {
      save();
    } else if(errorOccured.count == 0){
      reject(@"Unknown error occured", nil, nil);
    } else {
      reject(([errorOccured[0] length] == 0) ? nil : errorOccured[0],
             ([errorOccured[1] length] == 0) ? nil : errorOccured[1],
             ([errorOccured[2] length] == 0) ? nil : errorOccured[2]);
    }
  } else {  //원격 이미지 파일 로드 시.. 다른 방법 필요 // 이건 보통 ios 8~9 //임시
    [[PHPhotoLibrary sharedPhotoLibrary] performChanges:^{
      [PHAssetCreationRequest creationRequestForAssetFromImageAtFileURL:[NSURL URLWithString:uri]];
    } completionHandler:^(BOOL success, NSError * _Nullable error) {
      if(success){
        resolve(nil);
      } else {
        reject(@"Fail to save image", error.localizedDescription, error);
      }
    }];
  }
}

//#MARK: checkPhotoLibraryConfig
static void checkPhotoLibraryConfig()
{
#if RCT_DEV
  if (![[NSBundle mainBundle] objectForInfoDictionaryKey:@"NSPhotoLibraryUsageDescription"]) {
    RCTLogError(@"NSPhotoLibraryUsageDescription key must be present in Info.plist to use camera roll.");
  }
#endif
}

//#MARK: @createTempImage
- (NSString*) createTempImage:(NSData*)data
                     mimeType:(NSString* _Nullable )mimeType{
  NSString *tmpDirFullPath = [self getTmpDirectory];
  NSString *filePath = [tmpDirFullPath stringByAppendingString:[[NSUUID UUID] UUIDString]];
  NSString* type = (mimeType != NULL || mimeType.length != 0) ? mimeType:@"jpg";
  filePath = [filePath stringByAppendingString:[NSString stringWithFormat:@".%@", type]];
  
  BOOL status = [data writeToFile:filePath atomically:YES];
  if (!status) {
    return nil;
  }
  
  return filePath;
}

//#MARK: @getTmpDirectory
- (NSString*) getTmpDirectory {
  NSString *tmpFullPath = [NSTemporaryDirectory() stringByAppendingString:tempDirectoryPath];
  
  BOOL isDir;
  BOOL exists = [[NSFileManager defaultManager] fileExistsAtPath:tmpFullPath isDirectory:&isDir];
  if (!exists) {
    [[NSFileManager defaultManager] createDirectoryAtPath: tmpFullPath
                              withIntermediateDirectories:YES attributes:nil error:nil];
  }
  
  return tmpFullPath;
}

//#MARK: @cleanTmpdirectory
- (BOOL)cleanTmpDirectory {
  NSString* tmpDirectoryPath = [self getTmpDirectory];
  NSArray* tmpDirectory = [[NSFileManager defaultManager] contentsOfDirectoryAtPath:tmpDirectoryPath error:nil];
  
  for (NSString *file in tmpDirectory) {
    BOOL deleted = [[NSFileManager defaultManager] removeItemAtPath:[NSString stringWithFormat:@"%@%@", tmpDirectoryPath, file] error:nil];
    
    if (!deleted) {
      return false;
    }
  }
  
  return true;
}
   /**
     ph://{local identifier} 형식의 uri에서 이미지를 가져오는 함수
    가져온 데이터를 받는 건 handler callback
    에러가 난 경우 핸들러로 넘어가지 않고 리턴한다. 즉, 에러가 나지 않으면 nil이 리턴된다
      - Returns:  RCTRejectBlock에 넘길 NSArray* 형태 [ errCode, errMsg, {empty string} ]
    */
- (NSArray *_Nullable)        requestImageData: (NSString*) uri
            imageRequestResultHandlerOverAPI13: (void (^)(NSData *_Nullable imageData, NSString *_Nullable dataUTI, CGImagePropertyOrientation orientation, NSDictionary *_Nullable info)) imageRequestResultHandlerOverAPI13
                     imageRequestResultHandler:(void (^)(NSData *_Nullable imageData, NSString *_Nullable dataUTI, UIImageOrientation orientation, NSDictionary *_Nullable info)) imageRequestResultHandler
{
  if(![uri hasPrefix:@"ph://"]) {
    NSArray* rejectArray = [NSArray arrayWithObjects:@"Uri format error", @"Uri format doesn't fit with photoKit ('ph://')", @"", nil];
    return rejectArray;
  }

    PHFetchResult<PHAsset *> *asset = [PHAsset fetchAssetsWithLocalIdentifiers:@[[uri substringFromIndex:@"ph://".length]] options:nil];
    
    if(asset == nil || asset.count == 0) {
      NSArray* rejectArray = [NSArray arrayWithObjects:@"Image fetch result is nil", @"Check image fetch result", @"", nil];
      return rejectArray;
    } else if(asset.firstObject == nil) {
      NSArray* rejectArray = [NSArray arrayWithObjects:@"Image is nil", @"Check image", @"", nil];
      return rejectArray;
    }
    
    PHImageRequestOptions* options = [[PHImageRequestOptions alloc] init];
    options.synchronous = true;
    if (@available(iOS 13, *)) {
      [[PHImageManager defaultManager] requestImageDataAndOrientationForAsset:asset.firstObject
                                                                      options:options
                                                                resultHandler:imageRequestResultHandlerOverAPI13];
    } else {
      [[PHImageManager defaultManager] requestImageDataForAsset:asset.firstObject
                                                        options:options
                                                  resultHandler:imageRequestResultHandler];
  }
  return nil;
}

////#MARK: @RCT cleanSingle
//RCT_EXPORT_METHOD(cleanSingle:(NSString *) path
//                  resolver:(RCTPromiseResolveBlock)resolve
//                  rejecter:(RCTPromiseRejectBlock)reject) {
//    BOOL deleted = [[NSFileManager defaultManager] removeItemAtPath:path error:NULL];
//
//    if (!deleted) {
//      reject(@"Cleanup error", @"Cleanup error msg", nil);
//    } else {
//        resolve(nil);
//    }
//}

//#MARK: @RCT clean
RCT_REMAP_METHOD(clean,
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  if (![self cleanTmpDirectory]) {
    reject(@"Fail to clean", @"Fail to clean temp directory", nil);
  } else {
    resolve(nil);
  }
}

@end
