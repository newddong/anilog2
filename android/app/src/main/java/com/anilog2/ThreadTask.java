package com.anilog2;

import java.lang.Runnable;

import android.os.Handler;
import android.os.Looper;
import android.os.Message;

import androidx.annotation.NonNull;

//AsyncTask가 Deprecated되어서 대체제로 작성
public abstract class ThreadTask<T1,T2> implements Runnable {
    //Argument
    T1 mArgument;

    //Result
    T2 mResult;

    //Handle the Result
    public final int WORK_DONE = 0;
    Handler mResultHandler = new Handler(Looper.getMainLooper()){
        @Override
        public void handleMessage(@NonNull Message msg) {
            super.handleMessage(msg);

            //Call onPostExecute
            onPostExecute(mResult);
        }
    };

    //Execute
    final public void execute(final T1 arg){
        //Store the argument
        mArgument = arg;

        //Call onPreExecute
        onPreExecute();

        //Begin thread work
        Thread thread = new Thread(this);
        thread.start();
    }

    @Override
    public void run() {
        //Call doInBackground
        mResult = doInBackground(mArgument);

        //Notify main thread that the work is done
        mResultHandler.sendEmptyMessage(WORK_DONE);
    }


    //onPreExecute
    protected abstract void onPreExecute();

    //doInBackground
    protected abstract T2 doInBackground(T1 arg);

    //onPostExecute
    protected abstract void onPostExecute(T2 result);

}
