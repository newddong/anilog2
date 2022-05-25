package com.anilog2;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.BitmapRegionDecoder;
import android.graphics.Matrix;
import android.graphics.Rect;
import android.net.Uri;

import com.facebook.infer.annotation.Assertions;
import com.facebook.react.bridge.GuardedAsyncTask;
import com.facebook.react.bridge.JSApplicationIllegalArgumentException;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URL;
import java.net.URLConnection;

import com.anilog2.PhotoListModule;
import com.anilog2.PhotoListUtil;
import com.facebook.react.bridge.WritableNativeMap;

public class CropTask extends GuardedAsyncTask<Void, Void> {
    final Context mContext;
    final String mUri;
    final int mX;
    final int mY;
    final int mWidth;
    final int mHeight;
    int mTargetWidth = 0;
    int mTargetHeight = 0;
    final Promise mPromise;
    PhotoListModule mModule;

    public CropTask(
            ReactContext context,
            String uri,
            int x,
            int y,
            int width,
            int height,
            Promise promise,
            PhotoListModule module
    ){
        super(context);
        if(x<0||y<0||width<=0||height<0){
            throw new JSApplicationIllegalArgumentException(String.format(
                    "Invalid crop rectangle: [%d, %d, %d, %d]",x,y,width,height
            ));
        }
        mContext = context;
        mUri = uri;
        mX = x;
        mY = y;
        mWidth = width;
        mHeight = height;
        mPromise = promise;
        mModule = module;
    }

    public void setTargetSize(int width, int height){
        if(width<=0||height<=0){
            throw new JSApplicationIllegalArgumentException(String.format(
                    "Invalid target size: [%d, %d]",width,height
            ));
        }
        mTargetHeight = height;
        mTargetWidth = width;
    }

    public InputStream openBitmapInputStream() throws IOException{
        InputStream stream;
        if(PhotoListUtil.isLocalUri(mUri)){
            stream = mContext.getContentResolver().openInputStream(Uri.parse(mUri));
        }else{
            URLConnection connection = new URL(mUri).openConnection();
            stream = connection.getInputStream();
        }
        if(stream == null){
            throw new IOException("Cannot open bitmap: "+ mUri);
        }
        return stream;
    }

    @Override
    protected void doInBackgroundGuarded(Void... voids) {
        try{
            BitmapFactory.Options outOptions = new BitmapFactory.Options();

            boolean hasTargetSize = (mTargetWidth > 0) && (mTargetHeight > 0);

            Bitmap cropped;
            if(hasTargetSize){
                cropped = cropAndResize(mTargetWidth, mTargetHeight, outOptions);
            } else{
                cropped = crop(outOptions);
            }

            String mimeType = outOptions.outMimeType;
            if(mimeType == null || mimeType.isEmpty()){
                throw new IOException("Could not determine MIME type");
            }

            File tempFile = PhotoListUtil.createFile(mContext, PhotoListUtil.getFileTypeFromMime(mimeType));
            writeCompressedBitmapToFile(cropped, mimeType, tempFile);

            if(mimeType.equals("image/jpeg")){
                String tempOri = PhotoListUtil.getOrientation(Uri.parse(mUri),mContext);
                PhotoListUtil.setOrientation(tempFile, tempOri, mContext);
            }

            WritableMap response = new WritableNativeMap();
            response.putString("uri",Uri.fromFile(tempFile).toString());
            response.putDouble("fileSize",tempFile.length());
            response.putString("fileName",Uri.fromFile(tempFile).toString());
            response.putInt("width",mWidth);
            response.putInt("height",mHeight);
            mPromise.resolve(response);

        }catch (Exception e){
            mPromise.reject(e);
        }
    }

    private static void writeCompressedBitmapToFile(Bitmap cropped, String mimeType, File tempFile) throws IOException{
        OutputStream out = new FileOutputStream(tempFile);
        try{
            cropped.compress(PhotoListUtil.getBitmapCompressFormat(mimeType), 90, out);
        }finally {
            if(out!=null){
                out.close();
            }
        }
    }

    private Bitmap crop(BitmapFactory.Options outOptions) throws IOException{
        InputStream inputStream = openBitmapInputStream();
        // https://developer.android.com/reference/android/graphics/BitmapRegionDecoder.html
        BitmapRegionDecoder decoder = BitmapRegionDecoder.newInstance(inputStream, false);
        try{
            Rect rect = new Rect(mX, mY, mX + mWidth, mY + mHeight);
            return decoder.decodeRegion(rect, outOptions);
        } finally {
            if(inputStream != null){
                inputStream.close();
            }
            decoder.recycle();
        }
    }

    private Bitmap cropAndResize(int targetWidth, int targetHeight, BitmapFactory.Options outOptions) throws IOException{
        Assertions.assertNotNull(outOptions);

        float newWidth, newHeight, newX, newY, scale;
        float cropRectRatio = mWidth / (float) mHeight;
        float targetRatio = targetWidth / (float) targetHeight;
        if(cropRectRatio>targetRatio){
            newWidth = mHeight * targetRatio;
            newHeight = mHeight;
            newX = mX + (mWidth - newWidth) / 2;
            newY = mY;
            scale = targetHeight / (float) mHeight;
        }else {
            newWidth = mWidth;
            newHeight = mWidth /targetRatio;
            newX = mX;
            newY = mY + (mHeight - newHeight) / 2;
            scale = targetWidth / (float) mWidth;
        }

        outOptions.inSampleSize = getDecoderSampleSize(mWidth, mHeight, targetWidth, targetHeight);
        InputStream inputStream = openBitmapInputStream();

        Bitmap bitmap;
        try{
            bitmap = BitmapFactory.decodeStream(inputStream, null, outOptions);
            if(bitmap == null){
                throw new IOException("Cannot decode bitmap: "+ mUri);
            }
        } finally {
            if(inputStream!=null){
                inputStream.close();
            }
        }

        int cropX = Math.round(newX /(float)outOptions.inSampleSize);
        int cropY = Math.round(newY /(float)outOptions.inSampleSize);
        int cropWidth = Math.round(newWidth /(float)outOptions.inSampleSize);
        int cropHeight = Math.round(newHeight /(float)outOptions.inSampleSize);
        float cropScale = scale * outOptions.inSampleSize;

        Matrix scaleMatrix = new Matrix();
        scaleMatrix.setScale(cropScale, cropScale);
        boolean filter = true;

        return Bitmap.createBitmap(bitmap, cropX, cropY, cropWidth, cropHeight, scaleMatrix, filter);
    }

    /**
     * When scaling down the bitmap, decode only every n-th pixel in each dimension.
     * Calculate the largest {@code inSampleSize} value that is a power of 2 and keeps both
     * {@code width, height} larger or equal to {@code targetWidth, targetHeight}.
     * This can significantly reduce memory usage.
     */
    private int getDecoderSampleSize(int width, int height, int targetWidth, int targetHeight){
        int inSampleSize = 1;
        if(height>targetHeight||width>targetWidth){
            int halfHeight = height /2;
            int halfWidth = width /2;
            while((halfWidth/inSampleSize)>=targetWidth && (halfHeight/inSampleSize)>=targetHeight){
                inSampleSize *=2;
            }
        }
        return inSampleSize;
    }

}
