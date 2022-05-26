package com.anilog2;

import android.content.Context;
import android.media.MediaScannerConnection;
import android.net.Uri;
import android.os.Environment;

import com.facebook.common.logging.FLog;
import com.facebook.react.bridge.GuardedAsyncTask;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.common.ReactConstants;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.channels.FileChannel;

public class SaveTask extends GuardedAsyncTask<Void, Void> {

    private final Context mContext;
    private final Uri mUri;
    private final Promise mPromise;

    private static final String ERROR_UNABLE_TO_LOAD = "E_UNABLE_TO_LOAD";
    private static final String ERROR_UNABLE_TO_LOAD_PERMISSION = "E_UNABLE_TO_LOAD_PERMISSION";
    private static final String ERROR_UNABLE_TO_SAVE = "E_UNABLE_TO_SAVE";
    private static final String ERROR_UNABLE_TO_DELETE = "E_UNABLE_TO_DELETE";
    private static final String ERROR_UNABLE_TO_FILTER = "E_UNABLE_TO_FILTER";

    public SaveTask(ReactContext context, Uri uri, Promise promise) {
        super(context);
        mContext = context;
        mUri = uri;
        mPromise = promise;
    }

    @Override
    protected void doInBackgroundGuarded(Void... params) {
        File source = new File(mUri.getPath());
        FileChannel input = null, output = null;
        try {
//            boolean isAlbumPresent = !"".equals(mOptions.getString("album"));

            final File environment;
            // Media is not saved into an album when using Environment.DIRECTORY_DCIM.
//            if (isAlbumPresent) {
//                if ("video".equals(mOptions.getString("type"))) {
//                    environment = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_MOVIES);
//                } else {
//                    environment = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES);
//                }
//            } else {
//                environment = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DCIM);
//            }
            environment = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DCIM);
            File exportDir;
//            if (isAlbumPresent) {
//                exportDir = new File(environment, mOptions.getString("album"));
//                if (!exportDir.exists() && !exportDir.mkdirs()) {
//                    mPromise.reject(ERROR_UNABLE_TO_LOAD, "Album Directory not created. Did you request WRITE_EXTERNAL_STORAGE?");
//                    return;
//                }
//            } else {
//                exportDir = environment;
//            }
            exportDir = environment;
            if (!exportDir.isDirectory()) {
                mPromise.reject(ERROR_UNABLE_TO_LOAD, "External media storage directory not available");
                return;
            }
            File dest = new File(exportDir, source.getName());
            int n = 0;
            String fullSourceName = source.getName();
            String sourceName, sourceExt;
            if (fullSourceName.indexOf('.') >= 0) {
                sourceName = fullSourceName.substring(0, fullSourceName.lastIndexOf('.'));
                sourceExt = fullSourceName.substring(fullSourceName.lastIndexOf('.'));
            } else {
                sourceName = fullSourceName;
                sourceExt = "";
            }
            while (!dest.createNewFile()) {
                dest = new File(exportDir, sourceName + "_" + (n++) + sourceExt);
            }
            input = new FileInputStream(source).getChannel();
            output = new FileOutputStream(dest).getChannel();
            output.transferFrom(input, 0, input.size());
            input.close();
            output.close();

            MediaScannerConnection.scanFile(
                    mContext,
                    new String[]{dest.getAbsolutePath()},
                    null,
                    new MediaScannerConnection.OnScanCompletedListener() {
                        @Override
                        public void onScanCompleted(String path, Uri uri) {
                            if (uri != null) {
                                mPromise.resolve(uri.toString());
                            } else {
                                mPromise.reject(ERROR_UNABLE_TO_SAVE, "Could not add image to gallery");
                            }
                        }
                    });
        } catch (IOException e) {
            mPromise.reject(e);
        } finally {
            if (input != null && input.isOpen()) {
                try {
                    input.close();
                } catch (IOException e) {
                    FLog.e(ReactConstants.TAG, "Could not close input channel", e);
                }
            }
            if (output != null && output.isOpen()) {
                try {
                    output.close();
                } catch (IOException e) {
                    FLog.e(ReactConstants.TAG, "Could not close output channel", e);
                }
            }
        }
    }
}
