package com.nativeModul;

import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.widget.Toast;

import com.chat_app.ImitationReactActivity;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.UiThreadUtil;
import com.facebook.react.bridge.WritableArray;

/**
 * Created by Administrator on 2017/12/15.
 */
public class UtilEnter extends ReactContextBaseJavaModule {
    private static final String NATIVE_TAG="UtilEnter";//js调用的原生模块的名字
    private static final String  PREFS_NAME="com.chat_app";//控制台前缀
    private static ReactContext g_reactContext;
    public UtilEnter(ReactApplicationContext reactContext) {
        super(reactContext);
        g_reactContext=reactContext;
    }
    public static ReactContext reactContext(){
              return g_reactContext;
    }

    class RNPermissionCallback implements ImitationReactActivity.PermissionCallback {
        private Callback mCallback;
        RNPermissionCallback(final Callback cb) {
            mCallback = cb;
        }
        @Override
        public void onPermissionResult(String[] permissions, int[] grantResults) {
            WritableArray perms = Arguments.createArray();
            WritableArray result = Arguments.createArray();
            int count = permissions.length;
            for (int i = 0; i < count; ++i) {
                perms.pushString(permissions[i]);
                if (grantResults[i] == PackageManager.PERMISSION_GRANTED) {
                    result.pushBoolean(true);
                } else {
                    result.pushBoolean(false);
                }
            }

            if (mCallback != null) {
                mCallback.invoke(perms, result);
                mCallback = null;
            }
        }
    }

    /**
     * @return the name of this module. This will be the name used to {@code require()} this module
     * from javascript.
     */
    @Override
    public String getName() {
        return NATIVE_TAG;
    }

    @ReactMethod
    public void enter(String text,ReadableMap props){
        //Toast.makeText(getReactApplicationContext(), text, Toast.LENGTH_SHORT).show();
        Activity currentActivity = getCurrentActivity();
        if(null!=currentActivity){
            Class aimActivity = null;
            try {
                aimActivity = Class.forName(text);
                Intent intent = new Intent(currentActivity,aimActivity);
                if(props!=null){
                    intent.putExtra("props",Arguments.toBundle(props));
                }
                currentActivity.startActivity(intent);
            } catch (ClassNotFoundException e) {
                e.printStackTrace();
            }
        }
    }

    @ReactMethod
    public void overFinish(String text,ReadableMap props){
        //Toast.makeText(getReactApplicationContext(), text, Toast.LENGTH_SHORT).show();
        Activity currentActivity = getCurrentActivity();
        if(null!=currentActivity){
            currentActivity.finish();
        }
    }

    @ReactMethod
    public void requestPermissions(final ReadableArray permissions, final Callback cb) {
        UiThreadUtil.runOnUiThread(
                new Runnable() {
                    @Override
                    public void run() {
                        ImitationReactActivity activity=null;
                        if(getCurrentActivity() instanceof ImitationReactActivity){
                             activity = (ImitationReactActivity)getCurrentActivity();
                        }
                        if (activity != null) {
                            int size = permissions.size();
                            String perms[] = new String[size];
                            for (int i = 0; i < size; ++i) {
                                perms[i] = permissions.getString(i);
                            }
                            activity.requestPermissions(perms, new RNPermissionCallback(cb));
                        }
                    }
                }
        );
    }
}