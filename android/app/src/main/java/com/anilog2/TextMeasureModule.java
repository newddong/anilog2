package com.anilog2;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableNativeArray;


import android.content.res.AssetManager;
import android.graphics.Paint;
import android.graphics.Typeface;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

public class TextMeasureModule extends ReactContextBaseJavaModule{
    private ReactApplicationContext mContext;

    public TextMeasureModule(ReactApplicationContext reactContext){
        super(reactContext);
        mContext = reactContext;
    }

    public static final String NAME = "TextMeasureModule";


    @NonNull
    @Override
    public String getName() {
        return NAME;
    }

    @ReactMethod
    public void getTextWidthTable(final ReadableMap params, final Promise promise){
        String fontFamily = params.hasKey("fontFamily")? params.getString("fontFamily"):"";
        Double fontSize = params.hasKey("fontSize")? params.getDouble("fontSize"):1000;

        WritableMap results = new WritableNativeMap(); //리액트에 결과를 담을 맵
        WritableArray arr = new WritableNativeArray();
        WritableMap map = new WritableNativeMap();
        
        AssetManager am = mContext.getResources().getAssets(); //APK의 폰트 파일 목록을 불러오기 위한 에셋 메니저 호출
        List<String> fontFiles = new ArrayList<String>();

        try{
           String[] fonts = am.list("fonts");
           fontFiles = Arrays.asList(fonts);

        }catch (IOException e){

        }

        Iterator<String> itr = fontFiles.iterator();

        String fontPath = new String();

        while(itr.hasNext()){
            String temp = itr.next();
            if(temp.contains(fontFamily)){
                results.putString("fontPath","/fonts/"+temp);
                fontPath = temp;
                break;
            }
        }
        




//        char[] unicode = new char[13313];
//        for(int i=0;i<13312;i++){
//            unicode[i] = (char)i;
//        }
//        char[] emoji = new char[4096];
//        for(int i=126976;i<131071;i++){
//            emoji[i-126976] = (char)i;
//        }

        char[] unicode = new char[0x4000];
        for(int i=0;i<0x4000;i++){
            unicode[i] = (char)i;
        }
        char[] emoji = new char[(0x1FFFF-0x1F000)*2];
        for(int i=0x1F000;i<0x1FFFF;i++){
            emoji[(i-0x1F000)*2] = Character.toChars(i)[0];
            emoji[(i-0x1F000)*2+1] = Character.toChars(i)[1];
        }

        char han = (char)0xAC00;

        String unicodeStr = new String(unicode);
        float[] unicodeArr = new float[unicodeStr.length()];
        String emojiStr = new String(emoji,0, emoji.length);
        float[] emojiArr = new float[emojiStr.length()];
        float[] hanArr = new float[1];
        Paint paint = new Paint();

        paint.setTypeface(Typeface.createFromAsset(am,"fonts/"+fontPath));
        paint.setTextSize(fontSize.floatValue());
        paint.getTextWidths(unicodeStr, unicodeArr);
        paint.getTextWidths(emojiStr, emojiArr);
        paint.getTextWidths(han+"",hanArr);

        WritableMap unicodeTable = new WritableNativeMap();
        WritableMap emojiTable = new WritableNativeMap();
        WritableMap hanTable = new WritableNativeMap();
        for(int i=0;i<unicodeArr.length;i++){
            unicodeTable.putDouble(unicode[i]+"",(double)unicodeArr[i]);

        }
        for(int i=0;i<emoji.length;i+=2){
            char[] temp = {emoji[i],emoji[i+1]};
            emojiTable.putDouble(new String(temp),(double)emojiArr[i]);
        }
        hanTable.putDouble(han+"",(double) hanArr[0]);



        results.putMap("unicodeTable",unicodeTable);
        results.putMap("emojiTable",emojiTable);
        results.putMap("hanTable",hanTable);

        WritableMap fontMatrix = new WritableNativeMap();
        fontMatrix.putString("fontFeature",paint.getFontFeatureSettings());
        fontMatrix.putDouble("ascent",paint.getFontMetrics().ascent);
        fontMatrix.putDouble("descent",paint.getFontMetrics().descent);
        fontMatrix.putDouble("leading",paint.getFontMetrics().leading);
        fontMatrix.putDouble("top",paint.getFontMetrics().top);
        fontMatrix.putDouble("bottom",paint.getFontMetrics().bottom);
        fontMatrix.putDouble("fontSize",fontSize);
        results.putMap("fontMatrix", fontMatrix);

        promise.resolve(results);
    }

}
