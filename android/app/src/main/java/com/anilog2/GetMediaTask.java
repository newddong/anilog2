package com.anilog2;

import android.content.ContentResolver;
import android.content.Context;
import android.database.Cursor;
import android.provider.MediaStore;
import android.text.TextUtils;

import com.facebook.react.bridge.GuardedAsyncTask;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.annotation.Nullable;
import com.anilog2.PhotoListModule;

public class GetMediaTask extends GuardedAsyncTask<Void, Void> {
    private final Context mContext;
    private final int mFirst;
    private final @Nullable
    String mAfter;
    private final @Nullable String mGroupName;
    private final @Nullable
    ReadableArray mMimeTypes;
    private final Promise mPromise;
    private final String mAssetType;
    private final long mFromTime;
    private final long mToTime;
    private final String mFromID; //ID값으로 검색하기 위한 맴버 추가
    private final String mToID; //ID값으로 검색하기 위한 맴버 추가
    private final Set<String> mInclude;
    private final PhotoListModule mModule; //작업중인 모듈 참조

    public GetMediaTask(
            ReactContext context,
            int first,
            @Nullable String after,
            @Nullable String groupName,
            @Nullable ReadableArray mimeTypes,
            String assetType,
            long fromTime,
            long toTime,
            @Nullable ReadableArray include,
            String fromID, //ID값으로 검색하기 위한 맴버 추가
            String toID, //ID값으로 검색하기 위한 맴버 추가
            Promise promise,
            PhotoListModule module
    ) {
        super(context);
        mContext = context;
        mFirst = first;
        mAfter = after;
        mGroupName = groupName;
        mMimeTypes = mimeTypes;
        mPromise = promise;
        mAssetType = assetType;
        mFromTime = fromTime;
        mToTime = toTime;
        mInclude = createSetFromIncludeArray(include);
        mFromID = fromID; //ID값으로 검색하기 위한 맴버 추가
        mToID = toID; //ID값으로 검색하기 위한 맴버 추가
        mModule = module;
    }

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
            MediaStore.Images.Media._ID,
            MediaStore.Images.Media.MIME_TYPE,
            MediaStore.Images.Media.BUCKET_DISPLAY_NAME,
            MediaStore.Images.Media.DATE_TAKEN,
            MediaStore.MediaColumns.DATE_ADDED,
            MediaStore.MediaColumns.DATE_MODIFIED,
            MediaStore.MediaColumns.WIDTH,
            MediaStore.MediaColumns.HEIGHT,
            MediaStore.MediaColumns.SIZE,
            MediaStore.MediaColumns.DATA
    };

    private static final String SELECTION_BUCKET = MediaStore.Images.Media.BUCKET_DISPLAY_NAME + " = ?";
    private static final String SELECTION_DATE_TAKEN = MediaStore.Images.Media.DATE_TAKEN + " < ?";

    private static Set<String> createSetFromIncludeArray(@Nullable ReadableArray includeArray) {
        Set<String> includeSet = new HashSet<>();

        if (includeArray == null) {
            return includeSet;
        }

        for (int i = 0; i < includeArray.size(); i++) {
            @Nullable String includeItem = includeArray.getString(i);
            if (includeItem != null) {
                includeSet.add(includeItem);
            }
        }

        return includeSet;
    }

    @Override
    protected void doInBackgroundGuarded(Void... params) {
        StringBuilder selection = new StringBuilder("1");
        List<String> selectionArgs = new ArrayList<>();
        if (!TextUtils.isEmpty(mGroupName)) {
            selection.append(" AND " + SELECTION_BUCKET);
            selectionArgs.add(mGroupName);
        }

        if (mAssetType.equals(ASSET_TYPE_PHOTOS)) {
            selection.append(" AND " + MediaStore.Files.FileColumns.MEDIA_TYPE + " = "
                    + MediaStore.Files.FileColumns.MEDIA_TYPE_IMAGE);
        } else if (mAssetType.equals(ASSET_TYPE_VIDEOS)) {
            selection.append(" AND " + MediaStore.Files.FileColumns.MEDIA_TYPE + " = "
                    + MediaStore.Files.FileColumns.MEDIA_TYPE_VIDEO);
        } else if (mAssetType.equals(ASSET_TYPE_ALL)) {
            selection.append(" AND " + MediaStore.Files.FileColumns.MEDIA_TYPE + " IN ("
                    + MediaStore.Files.FileColumns.MEDIA_TYPE_VIDEO + ","
                    + MediaStore.Files.FileColumns.MEDIA_TYPE_IMAGE + ")");
        } else {
            mPromise.reject(
                    ERROR_UNABLE_TO_FILTER,
                    "Invalid filter option: '" + mAssetType + "'. Expected one of '"
                            + ASSET_TYPE_PHOTOS + "', '" + ASSET_TYPE_VIDEOS + "' or '" + ASSET_TYPE_ALL + "'."
            );
            return;
        }


        if (mMimeTypes != null && mMimeTypes.size() > 0) {
            selection.append(" AND " + MediaStore.Images.Media.MIME_TYPE + " IN (");
            for (int i = 0; i < mMimeTypes.size(); i++) {
                selection.append("?,");
                selectionArgs.add(mMimeTypes.getString(i));
            }
            selection.replace(selection.length() - 1, selection.length(), ")");
        }

        if (mFromTime > 0) {
//                selection.append(" AND " + Images.Media.DATE_TAKEN + " >= ?");
//                selection.append(" AND " + Images.Media.DATE_MODIFIED + " > ?");
            selection.append(" AND " + MediaStore.Images.Media.DATE_ADDED + " > ?");
            long fromTimeSec = Long.parseLong( mFromTime / 1000+"");
            selectionArgs.add(fromTimeSec + "");
//                selectionArgs.add(mFromTime + "");
//                selectionArgs.add(163833122 + "");
        }
        if (mToTime > 0) {
//                selection.append(" AND " + Images.Media.DATE_TAKEN + " <= ?");
//                selection.append(" AND " + Images.Media.DATE_MODIFIED + " <= ?");
            selection.append(" AND " + MediaStore.Images.Media.DATE_ADDED + " <= ?");
            selectionArgs.add(mToTime + "");
        }

        if(mFromID !=null){
            selection.append(" AND " + MediaStore.Images.Media._ID + " > ?");
            selectionArgs.add(mFromID);
        }
        if(mToID !=null){
            selection.append(" AND " + MediaStore.Images.Media._ID + " < ?");
            selectionArgs.add(mToID + "");
        }

        WritableMap response = new WritableNativeMap();
        ContentResolver resolver = mContext.getContentResolver();

        try {
            // set LIMIT to first + 1 so that we know how to populate page_info
            String limit = "limit=" + (mFirst + 1);

            if (!TextUtils.isEmpty(mAfter)) {
                limit = "limit=" + mAfter + "," + (mFirst + 1);
            }

            Cursor media = resolver.query(
                    MediaStore.Files.getContentUri("external").buildUpon().encodedQuery(limit).build(),
                    PROJECTION,
                    selection.toString(),
                    selectionArgs.toArray(new String[selectionArgs.size()]),
                    MediaStore.Images.Media._ID+ " DESC, " + MediaStore.Images.Media.DATE_ADDED + " DESC, " + MediaStore.Images.Media.DATE_MODIFIED + " DESC"); //이미지 정렬 추가
            if (media == null) {
                mPromise.reject(ERROR_UNABLE_TO_LOAD, "Could not get media");
            } else {
                try {
                   mModule.putEdges(resolver, media, response, mFirst, mInclude);
                   mModule.putPageInfo(media, response, mFirst, !TextUtils.isEmpty(mAfter) ? Integer.parseInt(mAfter) : 0);
                } finally {
                    media.close();
                    mPromise.resolve(response);
                }
            }
        } catch (SecurityException e) {
            mPromise.reject(
                    ERROR_UNABLE_TO_LOAD_PERMISSION,
                    "Could not get media: need READ_EXTERNAL_STORAGE permission",
                    e);
        }
    }
}
