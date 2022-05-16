package com.anilog2;

import android.content.ContentResolver;
import android.content.ContentUris;
import android.content.Context;
import android.content.res.AssetFileDescriptor;
import android.database.Cursor;
import android.graphics.BitmapFactory;
import android.media.MediaMetadataRetriever;
import android.media.MediaScannerConnection;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Build;
import android.os.Environment;
import android.provider.MediaStore;
import android.provider.MediaStore.Images;
import android.text.TextUtils;
import android.media.ExifInterface;

import androidx.annotation.NonNull;

import com.facebook.common.logging.FLog;
import com.facebook.react.bridge.GuardedAsyncTask;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.common.ReactConstants;
import com.facebook.react.module.annotations.ReactModule;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.channels.FileChannel;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.Set;

import javax.annotation.Nullable;
import android.util.Log;
import android.widget.Toast;

import static com.anilog2.PhotoListUtil.*;
import com.anilog2.GetMediaTask;

public class PhotoListModule extends ReactContextBaseJavaModule{
    public static final String NAME = "PhotoListModule";

    private static final String ERROR_UNABLE_TO_LOAD = "E_UNABLE_TO_LOAD";
    private static final String ERROR_UNABLE_TO_LOAD_PERMISSION = "E_UNABLE_TO_LOAD_PERMISSION";
    private static final String ERROR_UNABLE_TO_SAVE = "E_UNABLE_TO_SAVE";
    private static final String ERROR_UNABLE_TO_DELETE = "E_UNABLE_TO_DELETE";
    private static final String ERROR_UNABLE_TO_FILTER = "E_UNABLE_TO_FILTER";

    private static final String ASSET_TYPE_PHOTOS = "Photos";
    private static final String ASSET_TYPE_VIDEOS = "Videos";
    private static final String ASSET_TYPE_ALL = "All";

    private static final String INCLUDE_FILENAME = "filename";
    private static final String INCLUDE_FILE_SIZE = "fileSize";
    private static final String INCLUDE_LOCATION = "location";
    private static final String INCLUDE_IMAGE_SIZE = "imageSize";
    private static final String INCLUDE_PLAYABLE_DURATION = "playableDuration";

    private static final String[] PROJECTION = {
            Images.Media._ID,
            Images.Media.MIME_TYPE,
            Images.Media.BUCKET_DISPLAY_NAME,
            Images.Media.DATE_TAKEN,
            MediaStore.MediaColumns.DATE_ADDED,
            MediaStore.MediaColumns.DATE_MODIFIED,
            MediaStore.MediaColumns.WIDTH,
            MediaStore.MediaColumns.HEIGHT,
            MediaStore.MediaColumns.SIZE,
            MediaStore.MediaColumns.DATA
    };

    private static final String SELECTION_BUCKET = Images.Media.BUCKET_DISPLAY_NAME + " = ?";
    private static final String SELECTION_DATE_TAKEN = Images.Media.DATE_TAKEN + " < ?";

    final ReactApplicationContext reactContext;

    public PhotoListModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @NonNull
    @Override
    public String getName() {
        return NAME;
    }

    @ReactMethod
    public void getPhotos(final ReadableMap params, final Promise promise) {
        int first = params.getInt("first");
        String after = params.hasKey("after") ? params.getString("after") : null;
        String groupName = params.hasKey("groupName") ? params.getString("groupName") : null;
        String assetType = params.hasKey("assetType") ? params.getString("assetType") : ASSET_TYPE_PHOTOS;
        long fromTime = params.hasKey("fromTime") ? Long.parseLong(params.getString("fromTime")) : 0;
        long toTime = params.hasKey("toTime") ? Long.parseLong(params.getString("toTime")) : 0;
        String fromID = params.hasKey("fromID") ? params.getString("fromID") : null;
        String toID = params.hasKey("toID") ? params.getString("toID") : null;
        ReadableArray mimeTypes = params.hasKey("mimeTypes")
                ? params.getArray("mimeTypes")
                : null;
        ReadableArray include = params.hasKey("include") ? params.getArray("include") : null;
        Log.d("getPhotos query","fromTime: "+ fromTime + "    toTime: "+ toTime + "    fromID: "+ fromID+ "  toID   "+ toID);
        new GetMediaTask(
                getReactApplicationContext(),
                first,
                after,
                groupName,
                mimeTypes,
                assetType,
                fromTime,
                toTime,
                include,
                fromID,
                toID,
                promise,
                this
                )
                .executeOnExecutor(AsyncTask.THREAD_POOL_EXECUTOR);
    }

    @ReactMethod
    public void compressImage(final ReadableMap options, final Promise promise){
        ReadableArray medias = options.hasKey("imageFiles")?options.getArray("imageFiles"):null;

        PhotoListUtil.Options ops = new PhotoListUtil.Options(options);
//        boolean isSingleSelect = ops.selectionLimit == 1;
//        boolean isPhoto = ops.mediaType.equals(mediaTypePhoto);
//        boolean isVideo = ops.mediaType.equals(mediaTypeVideo);
        List<Uri> uris = new ArrayList<Uri>();
        for(int i=0;i<medias.size();i++){
            uris.add(Uri.parse(medias.getString(i)));
        }

        onAssetsObtained(uris, ops, promise);

        Toast myToast = Toast.makeText(reactContext,"우웩"+(medias.size()>0?medias.getString(0):"선택한 사진이 없음"), Toast.LENGTH_SHORT);
        myToast.show();

    }

    @ReactMethod
    public void deletePhotos(final ReadableMap options, final Promise promise){
        ReadableArray medias = options.hasKey("imageFiles")?options.getArray("imageFiles"):null;
        WritableArray result = new WritableNativeArray();
        List<Uri> uris = new ArrayList<Uri>();
        for(int i=0;i<medias.size();i++){
            result.pushString(Uri.parse(medias.getString(i)).getPath());
            new File(Uri.parse(medias.getString(i)).getPath()).delete();
        }

        promise.resolve(result);
    }


    void onAssetsObtained(List<Uri> fileUris, PhotoListUtil.Options options, final Promise promise) {
        try {
            promise.resolve(PhotoListUtil.getResponseMap(fileUris, options, reactContext));
        } catch (RuntimeException exception) {
            promise.reject(errOthers, exception.getMessage());
        }
    }



    public static void putPageInfo(Cursor media, WritableMap response, int limit, int offset) {
        WritableMap pageInfo = new WritableNativeMap();
        pageInfo.putBoolean("has_next_page", limit < media.getCount());
        if (limit < media.getCount()) {
            pageInfo.putString(
                    "end_cursor",
                    Integer.toString(offset + limit)
            );
        }
        response.putMap("page_info", pageInfo);
    }

    public static void putEdges(
            ContentResolver resolver,
            Cursor media,
            WritableMap response,
            int limit,
            Set<String> include) {
        WritableArray edges = new WritableNativeArray();
        media.moveToFirst();
        int mediaIdIndex = media.getColumnIndex(Images.Media._ID); //ID인덱스 추가
        int mimeTypeIndex = media.getColumnIndex(Images.Media.MIME_TYPE);
        int groupNameIndex = media.getColumnIndex(Images.Media.BUCKET_DISPLAY_NAME);
        int dateTakenIndex = media.getColumnIndex(Images.Media.DATE_TAKEN);
        int dateAddedIndex = media.getColumnIndex(MediaStore.MediaColumns.DATE_ADDED);
        int dateModifiedIndex = media.getColumnIndex(MediaStore.MediaColumns.DATE_MODIFIED);
        int widthIndex = media.getColumnIndex(MediaStore.MediaColumns.WIDTH);
        int heightIndex = media.getColumnIndex(MediaStore.MediaColumns.HEIGHT);
        int sizeIndex = media.getColumnIndex(MediaStore.MediaColumns.SIZE);
        int dataIndex = media.getColumnIndex(MediaStore.MediaColumns.DATA);

        boolean includeLocation = include.contains(INCLUDE_LOCATION);
        boolean includeFilename = include.contains(INCLUDE_FILENAME);
        boolean includeFileSize = include.contains(INCLUDE_FILE_SIZE);
        boolean includeImageSize = include.contains(INCLUDE_IMAGE_SIZE);
        boolean includePlayableDuration = include.contains(INCLUDE_PLAYABLE_DURATION);

        for (int i = 0; i < limit && !media.isAfterLast(); i++) {
            WritableMap edge = new WritableNativeMap();
            WritableMap node = new WritableNativeMap();
            boolean imageInfoSuccess =
                    putImageInfo(resolver, media, node, widthIndex, heightIndex, sizeIndex, dataIndex,
                            mimeTypeIndex, includeFilename, includeFileSize, includeImageSize,
                            includePlayableDuration, mediaIdIndex);
            if (imageInfoSuccess) {
                putBasicNodeInfo(media, node, mimeTypeIndex, groupNameIndex, dateTakenIndex, dateAddedIndex, dateModifiedIndex);
                putLocationInfo(media, node, dataIndex, includeLocation);

                edge.putMap("node", node);
                edges.pushMap(edge);
            } else {
                // we skipped an image because we couldn't get its details (e.g. width/height), so we
                // decrement i in order to correctly reach the limit, if the cursor has enough rows
                i--;
            }
            media.moveToNext();
        }
        response.putArray("edges", edges);
    }

    private static void putBasicNodeInfo(
            Cursor media,
            WritableMap node,
            int mimeTypeIndex,
            int groupNameIndex,
            int dateTakenIndex,
            int dateAddedIndex,
            int dateModifiedIndex) {
        node.putString("type", media.getString(mimeTypeIndex));
        node.putString("group_name", media.getString(groupNameIndex));
        long dateTaken = media.getLong(dateTakenIndex);
        if (dateTaken == 0L) {
            //date added is in seconds, date taken in milliseconds, thus the multiplication
            dateTaken = media.getLong(dateAddedIndex) * 1000;
        }
        node.putDouble("timestamp", dateTaken / 1000d);
        node.putDouble("modified", media.getLong(dateModifiedIndex));
        Log.d("에지인포", "dateTaken: "+media.getLong(dateTakenIndex) + "   dateModifiedIndex : "+media.getLong(dateModifiedIndex)+ "  아이디 : "+media.getString(media.getColumnIndex(Images.Media._ID)));
    }

    /**
     * @return Whether we successfully fetched all the information about the image that we were asked
     * to include
     */
    private static boolean putImageInfo(
            ContentResolver resolver,
            Cursor media,
            WritableMap node,
            int widthIndex,
            int heightIndex,
            int sizeIndex,
            int dataIndex,
            int mimeTypeIndex,
            boolean includeFilename,
            boolean includeFileSize,
            boolean includeImageSize,
            boolean includePlayableDuration,
            int mediaIdIndex) {
        WritableMap image = new WritableNativeMap();
        Uri photoUri = Uri.parse("file://" + media.getString(dataIndex));
        image.putString("uri", photoUri.toString());
        String mimeType = media.getString(mimeTypeIndex);

        boolean isVideo = mimeType != null && mimeType.startsWith("video");
        boolean putImageSizeSuccess = putImageSize(resolver, media, image, widthIndex, heightIndex,
                photoUri, isVideo, includeImageSize);
        boolean putPlayableDurationSuccess = putPlayableDuration(resolver, image, photoUri, isVideo,
                includePlayableDuration);

        if (includeFilename) {
            File file = new File(media.getString(dataIndex));
            String strFileName = file.getName();
            image.putString("filename", strFileName);
        } else {
            image.putNull("filename");
        }

        if (includeFileSize) {
            image.putDouble("fileSize", media.getLong(sizeIndex));
        } else {
            image.putNull("fileSize");
        }
        node.putString("imageID",media.getString(mediaIdIndex));
        node.putMap("image", image);
        return putImageSizeSuccess && putPlayableDurationSuccess;
    }

    /**
     * @return Whether we succeeded in fetching and putting the playableDuration
     */
    private static boolean putPlayableDuration(
            ContentResolver resolver,
            WritableMap image,
            Uri photoUri,
            boolean isVideo,
            boolean includePlayableDuration) {
        image.putNull("playableDuration");

        if (!includePlayableDuration || !isVideo) {
            return true;
        }

        boolean success = true;
        @Nullable Integer playableDuration = null;
        @Nullable AssetFileDescriptor photoDescriptor = null;
        try {
            photoDescriptor = resolver.openAssetFileDescriptor(photoUri, "r");
        } catch (FileNotFoundException e) {
            success = false;
            FLog.e(ReactConstants.TAG, "Could not open asset file " + photoUri.toString(), e);
        }

        if (photoDescriptor != null) {
            MediaMetadataRetriever retriever = new MediaMetadataRetriever();
            try {
                retriever.setDataSource(photoDescriptor.getFileDescriptor());
            } catch (RuntimeException e) {
                // Do nothing. We can't handle this, and this is usually a system problem
            }
            try {
                int timeInMillisec = Integer.parseInt(retriever.extractMetadata(MediaMetadataRetriever.METADATA_KEY_DURATION));
                playableDuration = timeInMillisec / 1000;
            } catch (NumberFormatException e) {
                success = false;
                FLog.e(
                        ReactConstants.TAG,
                        "Number format exception occurred while trying to fetch video metadata for "
                                + photoUri.toString(),
                        e);
            }
            retriever.release();
        }

        if (photoDescriptor != null) {
            try {
                photoDescriptor.close();
            } catch (IOException e) {
                // Do nothing. We can't handle this, and this is usually a system problem
            }
        }

        if (playableDuration != null) {
            image.putInt("playableDuration", playableDuration);
        }

        return success;
    }

    private static boolean putImageSize(
            ContentResolver resolver,
            Cursor media,
            WritableMap image,
            int widthIndex,
            int heightIndex,
            Uri photoUri,
            boolean isVideo,
            boolean includeImageSize) {
        image.putNull("width");
        image.putNull("height");

        if (!includeImageSize) {
            return true;
        }

        boolean success = true;
        @Nullable AssetFileDescriptor photoDescriptor = null;

        /* Read height and width data from the gallery cursor columns */
        int width = media.getInt(widthIndex);
        int height = media.getInt(heightIndex);

        /* If the columns don't contain the size information, read the media file */
        if (width <= 0 || height <= 0) {
            try {
                photoDescriptor = resolver.openAssetFileDescriptor(photoUri, "r");
                if (isVideo) {
                    MediaMetadataRetriever retriever = new MediaMetadataRetriever();
                    try {
                        retriever.setDataSource(photoDescriptor.getFileDescriptor());
                    } catch (RuntimeException e) {
                        // Do nothing. We can't handle this, and this is usually a system problem
                    }
                    try {
                        width = Integer.parseInt(retriever.extractMetadata(MediaMetadataRetriever.METADATA_KEY_VIDEO_WIDTH));
                        height = Integer.parseInt(retriever.extractMetadata(MediaMetadataRetriever.METADATA_KEY_VIDEO_HEIGHT));
                    } catch (NumberFormatException e) {
                        success = false;
                        FLog.e(
                                ReactConstants.TAG,
                                "Number format exception occurred while trying to fetch video metadata for "
                                        + photoUri.toString(),
                                e);
                    }
                    retriever.release();
                } else {
                    BitmapFactory.Options options = new BitmapFactory.Options();
                    // Set inJustDecodeBounds to true so we don't actually load the Bitmap in memory,
                    // but only get its dimensions
                    options.inJustDecodeBounds = true;
                    BitmapFactory.decodeFileDescriptor(photoDescriptor.getFileDescriptor(), null, options);
                    width = options.outWidth;
                    height = options.outHeight;
                }
            } catch (FileNotFoundException e) {
                success = false;
                FLog.e(ReactConstants.TAG, "Could not open asset file " + photoUri.toString(), e);
            }
        }

        /* Read the EXIF photo data to update height and width in case a rotation is encoded */
        if (success && !isVideo && Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            try {
                if (photoDescriptor == null) photoDescriptor = resolver.openAssetFileDescriptor(photoUri, "r");
                ExifInterface exif = new ExifInterface(photoDescriptor.getFileDescriptor());
                int rotation = exif.getAttributeInt(ExifInterface.TAG_ORIENTATION, ExifInterface.ORIENTATION_NORMAL);
                if (rotation == ExifInterface.ORIENTATION_ROTATE_90 || rotation == ExifInterface.ORIENTATION_ROTATE_270) {
                    // swap values
                    int temp = width;
                    width = height;
                    height = temp;
                }
            } catch (FileNotFoundException e) {
                success = false;
                FLog.e(ReactConstants.TAG, "Could not open asset file " + photoUri.toString(), e);
            } catch (IOException e) {
                FLog.e(ReactConstants.TAG, "Could not get exif data for file " + photoUri.toString(), e);
            }
        }

        if (photoDescriptor != null) {
            try {
                photoDescriptor.close();
            } catch (IOException e) {
                // Do nothing. We can't handle this, and this is usually a system problem
            }
        }

        image.putInt("width", width);
        image.putInt("height", height);
        return success;
    }

    private static void putLocationInfo(
            Cursor media,
            WritableMap node,
            int dataIndex,
            boolean includeLocation) {
        node.putNull("location");

        if (!includeLocation) {
            return;
        }

        try {
            // location details are no longer indexed for privacy reasons using string Media.LATITUDE, Media.LONGITUDE
            // we manually obtain location metadata using ExifInterface#getLatLong(float[]).
            // ExifInterface is added in API level 5
            final ExifInterface exif = new ExifInterface(media.getString(dataIndex));
            float[] imageCoordinates = new float[2];
            boolean hasCoordinates = exif.getLatLong(imageCoordinates);
            if (hasCoordinates) {
                double longitude = imageCoordinates[1];
                double latitude = imageCoordinates[0];
                WritableMap location = new WritableNativeMap();
                location.putDouble("longitude", longitude);
                location.putDouble("latitude", latitude);
                node.putMap("location", location);
            }
        } catch (IOException e) {
            FLog.e(ReactConstants.TAG, "Could not read the metadata", e);
        }
    }




}
