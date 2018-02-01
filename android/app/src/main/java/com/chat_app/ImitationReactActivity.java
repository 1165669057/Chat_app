package com.chat_app;

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.support.v4.app.ActivityCompat;
import android.support.v4.app.FragmentActivity;
import android.support.v4.content.ContextCompat;
import android.view.KeyEvent;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;
import com.facebook.react.modules.core.PermissionAwareActivity;
import com.facebook.react.modules.core.PermissionListener;
import com.nativeModul.RNImagePicker;
import com.nativeModul.RNMultiImagePicker;

import javax.annotation.Nullable;

/**
 * Base Activity for React Native applications.
 */
public abstract class ImitationReactActivity extends FragmentActivity
        implements DefaultHardwareBackBtnHandler, PermissionAwareActivity {
    private Bundle mBundle;
    final public static int BT_MULTII_IMAGE_PICKER = 2;
    final public static int REQUEST_CODE_RN_PERMISSIONS = 12;
    private final ImitationReactActivityDelegate mDelegate;
    protected ImitationReactActivity() {
        mDelegate = createReactActivityDelegate();
    }
    public interface PermissionCallback {
        public void onPermissionResult(String[] permissions, int[] grantResults);
    }
    private PermissionCallback mRequestPermissionCB = null;
    public void requestPermissions(final String[] permissions, final PermissionCallback cb) {
        int count = permissions.length;
        boolean needreq = false;
        //List<String> need_permissions = null;
        for (int i = 0; i < count; ++i) {
            String permission = permissions[i];
            int checkPermission = ContextCompat.checkSelfPermission(this, permission);
            if (checkPermission != PackageManager.PERMISSION_GRANTED) {
                needreq = true;
                break;
                /*
                if (need_permissions == null) {
                    need_permissions = new ArrayList<String>();
                }
                need_permissions.add(permission);
                */
            }
        }

        if (needreq) {
            mRequestPermissionCB = cb;
            //ActivityCompat.requestPermissions(this, need_permissions.toArray(new String[need_permissions.size()]), RNActivity.REQUEST_CODE_RN_PERMISSIONS);
            ActivityCompat.requestPermissions(this, permissions, ImitationReactActivity.REQUEST_CODE_RN_PERMISSIONS);
        }
        else {
            int result[] = new int[count];
            for (int i = 0; i < count; ++i) {
                result[i] = PackageManager.PERMISSION_GRANTED;
            }

            if (cb != null) {
                cb.onPermissionResult(permissions, result);
            }
        }
    }
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     * e.g."MoviesApp"
     */
    protected @Nullable
    String getMainComponentName(){
        return null;
    }

    /**
     * Called at construction time, override if you have a custom delegate implementation.
     */
    protected ImitationReactActivityDelegate createReactActivityDelegate() {
        return new ImitationReactActivityDelegate(this, getMainComponentName());
    }
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
         mBundle= getIntent().getBundleExtra("props");

        mDelegate.onCreate(savedInstanceState,mBundle);
    }

    @Override
    protected void onPause() {
        super.onPause();
        mDelegate.onPause();
    }
    @Override
    protected void onResume() {
        super.onResume();
        mDelegate.onResume();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        mDelegate.onDestroy();
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        mDelegate.onActivityResult(requestCode, resultCode, data);
        if (requestCode == RNImagePicker.PICK_IMAGE_REQUEST) {
            RNImagePicker.onPickResult(this, resultCode, data);
        }
        else if (requestCode == RNImagePicker.CROP_IMAGE_REQUEST) {
            RNImagePicker.onCropResult(this, resultCode, data);
        }
        else if (requestCode == BT_MULTII_IMAGE_PICKER){
            RNMultiImagePicker.onMultiPickerResult(this, requestCode, resultCode, data);
        }
    }

    @Override
    public boolean onKeyUp(int keyCode, KeyEvent event) {
        return mDelegate.onKeyUp(keyCode, event) || super.onKeyUp(keyCode, event);
    }
    @Override
    public void onBackPressed() {
        if (!mDelegate.onBackPressed()) {
            super.onBackPressed();
        }
    }

    @Override
    public void invokeDefaultOnBackPressed() {
        super.onBackPressed();
    }

    @Override
    public void onNewIntent(Intent intent) {
        if (!mDelegate.onNewIntent(intent)) {
            super.onNewIntent(intent);
        }
    }

    @Override
    public void requestPermissions(
            String[] permissions,
            int requestCode,
            PermissionListener listener) {
        mDelegate.requestPermissions(permissions, requestCode, listener);
    }

    @Override
    public void onRequestPermissionsResult(
            int requestCode,
            String[] permissions,
            int[] grantResults) {
        mDelegate.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }

    protected final ReactNativeHost getReactNativeHost() {
        return mDelegate.getReactNativeHost();
    }

    protected final ReactInstanceManager getReactInstanceManager() {
        return mDelegate.getReactInstanceManager();
    }

    protected final void loadApp(String appKey) {
        mDelegate.loadApp(appKey);
    }
}
