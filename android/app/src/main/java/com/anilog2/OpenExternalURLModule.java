package com.anilog2;

import androidx.annotation.NonNull;

import android.content.Intent;
import android.net.Uri;
import android.provider.Settings;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import android.util.Log;

public class OpenExternalURLModule extends ReactContextBaseJavaModule{
      private ReactApplicationContext mContext;

    public OpenExternalURLModule(ReactApplicationContext reactContext){
        super(reactContext);
        mContext = reactContext;
    }

    public static final String NAME = "OpenExternalURLModule";

    @Override
    public String getName() {
        return "OpenExternalURLModule";
    }
    
    @ReactMethod
    public void generalSettings() {
        Intent intent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        intent.addFlags(Intent.FLAG_ACTIVITY_NO_HISTORY);
            Log.d("startActivity","fromTime: ");
        if (intent.resolveActivity(mContext.getPackageManager()) != null) {
            mContext.startActivity(intent);
        }
    }
        


}
