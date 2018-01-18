/*
 * Copyright (C) 2016 BangTu. All rights reserved.
 */
package com.nativeModul;

import android.Manifest;
import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.Matrix;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.provider.MediaStore;
import android.support.v4.content.ContextCompat;
import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.security.MessageDigest;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by tomnotcat on 4/26/16.
 */
public class RNImagePicker extends ReactContextBaseJavaModule {
    public static final int PICK_IMAGE_REQUEST = 101;
    public static final int CROP_IMAGE_REQUEST = 102;
    private static Handler g_messageHandler;
    private static PickImage g_currentPick;

    private static final char HEX_DIGITS[] = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
            'a', 'b', 'c', 'd', 'e', 'f' };

    private class PickImage implements Runnable, ActionSheet.MenuItemClickListener {
        private ReadableMap mOptions;
        private Promise mPromise;
        private Uri mCropFileUri;

        public PickImage(final ReadableMap options, Promise promise) {
            mOptions = options;
            mPromise = promise;
        }
        @Override
        public void run() {
            Activity activity =getCurrentActivity(); //RNActivity.currentActivity();
            /*
            Do permission request in JS
            //6.0授权
            if (ContextCompat.checkSelfPermission(activity, Manifest.permission.CAMERA)
                    != PackageManager.PERMISSION_GRANTED) {
                //CAMERA
                ActivityCompat.requestPermissions(activity, new String[]{Manifest.permission.CAMERA},
                        200);
            }

            if (ContextCompat.checkSelfPermission(activity, Manifest.permission.READ_EXTERNAL_STORAGE)
                    != PackageManager.PERMISSION_GRANTED) {
                //申请WRITE_EXTERNAL_STORAGE权限
                ActivityCompat.requestPermissions(activity, new String[]{Manifest.permission.READ_EXTERNAL_STORAGE},
                        200);
            }

            if (ContextCompat.checkSelfPermission(activity, Manifest.permission.WRITE_EXTERNAL_STORAGE)
                    != PackageManager.PERMISSION_GRANTED) {
                //申请WRITE_EXTERNAL_STORAGE权限
                ActivityCompat.requestPermissions(activity, new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE},
                        200);
            }
            */

            ActionSheet.initStyle(activity);
            ActionSheet menuView = new ActionSheet(activity);
            menuView.setCancelButtonTitle("取消");
            menuView.addItems("拍照", "从相册选择");
            menuView.setItemClickListener(this);
            menuView.setCancelableOnTouchMenuOutside(true);
            menuView.showMenu();
        }

        private boolean hasStoragePermission(Context context){
            if(true/*Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN*/){
                // Permission was added in API Level 16
                return (ContextCompat.checkSelfPermission(context, Manifest.permission.READ_EXTERNAL_STORAGE)
                        == PackageManager.PERMISSION_GRANTED) &&
                        (ContextCompat.checkSelfPermission(context, Manifest.permission.WRITE_EXTERNAL_STORAGE)
                                == PackageManager.PERMISSION_GRANTED);
            }
            return true;
        }

        private boolean hasCameraPermission(Context context){
            if(true/*Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN*/){
                // Permission was added in API Level 16
                return ContextCompat.checkSelfPermission(context, Manifest.permission.CAMERA)
                        == PackageManager.PERMISSION_GRANTED;
            }
            return true;
        }

        @Override
        public void onItemClick(int itemPosition)
        {
            if (g_currentPick != null) {
                mPromise.reject("E_PENDING_PICK", "There is pending image pick");
                return;
            }

            g_currentPick = this;
            switch (itemPosition) {
                case 1:
                    try {
                        Activity activity =getCurrentActivity(); //RNActivity.currentActivity();
                        if (hasStoragePermission(activity) && hasCameraPermission(activity)) {
                            Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
                            intent.setAction(MediaStore.ACTION_IMAGE_CAPTURE);
                            activity.startActivityForResult(intent, PICK_IMAGE_REQUEST);
                        }
                        else {
                            g_currentPick = null;
                            mPromise.resolve(null);
                        }
                    }
                    catch (Exception e) {
                        e.printStackTrace();
                        g_currentPick = null;
                        mPromise.resolve(null);
                    }
                    break;

                case 2:
                    try {
                        Activity activity =getCurrentActivity(); //RNActivity.currentActivity();
                        if (hasStoragePermission(activity)) {
                            Intent intent = new Intent();
                            intent.setType("image/*");
                            intent.setAction(Intent.ACTION_GET_CONTENT);
                            activity.startActivityForResult(intent, PICK_IMAGE_REQUEST);
                        }
                        else {
                            g_currentPick = null;
                            mPromise.resolve(null);
                        }
                    }
                    catch (ActivityNotFoundException e) {
                        e.printStackTrace();
                        g_currentPick = null;
                        mPromise.resolve(null);
                    }
                    break;

                default:
                    g_currentPick = null;
                    mPromise.resolve(null);
                    break;
            }
        }
    }

    public static void initMessageHandler() {
        if (g_messageHandler == null) {
            g_messageHandler = new Handler();
        }
    }

    public static String getMD5(byte[] data)
    {
        try
        {
            MessageDigest md5 = MessageDigest.getInstance("MD5");
            md5.update(data);
            byte[] encryption = md5.digest();

            StringBuffer strBuf = new StringBuffer();
            for (int i = 0; i < encryption.length; i++)
            {
                if (Integer.toHexString(0xff & encryption[i]).length() == 1)
                {
                    strBuf.append("0").append(Integer.toHexString(0xff & encryption[i]));
                }
                else
                {
                    strBuf.append(Integer.toHexString(0xff & encryption[i]));
                }
            }

            return strBuf.toString();
        }
        catch (Exception e)
        {
            return "";
        }
    }

    public static String toHexString(byte[] b) {
        StringBuilder sb = new StringBuilder(b.length * 2);
        for (int i = 0; i < b.length; i++) {
            sb.append(HEX_DIGITS[(b[i] & 0xf0) >>> 4]);
            sb.append(HEX_DIGITS[b[i] & 0x0f]);
        }
        return sb.toString();
    }

    private static String  getFileMd5(File file){
        try{
            MessageDigest msgMd5 = MessageDigest.getInstance("MD5");
            InputStream md5In = new FileInputStream(file);
            int numRead = 0;
            byte[] md5FileInput = new byte[4096*50];
            while ((numRead = md5In.read(md5FileInput)) > 0) {
                msgMd5.update(md5FileInput, 0, numRead);

            }
            String localMD5 = toHexString(msgMd5.digest());
            md5In.close();
            return localMD5;
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    public static String getPhotoFileName() {
        Date date = new Date(System.currentTimeMillis());
        SimpleDateFormat dateFormat = new SimpleDateFormat("'IMG'_yyyyMMdd_HHmmss");
        return dateFormat.format(date) + ".png";
    }

    public static File createTempFile(String hash) {
        String tmpDir = System.getProperty("java.io.tmpdir", ".");
        File tmpDirFile = new File(tmpDir);
        String fileName = null;
        if (hash != null) {
            fileName = hash + ".png";
        }
        else {
            fileName = getPhotoFileName();
        }

        File tempFile = new File(tmpDirFile, fileName);
        return tempFile;
    }

    public static boolean hasSdcard() {
        String state = Environment.getExternalStorageState();
        return state.equals(Environment.MEDIA_MOUNTED);
    }

    public static File saveImageToTemp(Bitmap bitmap) {
        if (!hasSdcard()) {
            Log.w("RNImagePicker", "No SD Card");
            return null;
        }

        // TODO: also save exif?
        String path = Environment.getExternalStorageDirectory() + File.separator + ".bangtu";
        //String path = System.getProperty("java.io.tmpdir", ".");
        String fileName = getPhotoFileName();
        File filepath = new File(path);
        if (!filepath.exists()){
            filepath.mkdirs();
        }

        File file = new File(filepath, fileName);
        try {
            if (!file.exists()) {
                if (!file.createNewFile())
                    return null;

                file.deleteOnExit();
                OutputStream os = new FileOutputStream(file);
                //baos.writeTo(os);
                //bitmap.compress(Bitmap.CompressFormat.PNG, 100, os);
                bitmap.compress(Bitmap.CompressFormat.JPEG, 100, os);
                os.flush();
                os.close();
                return file;
            }
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public static WritableMap savePicToTemp(Bitmap bitmap) {
        WritableMap result = null;
        try {
            Log.d("RNImagePicker","结束读取Md5输入流");

            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            //bitmap.compress(Bitmap.CompressFormat.PNG, 100, baos);
            bitmap.compress(Bitmap.CompressFormat.JPEG, 100, baos);
            byte []buf = baos.toByteArray();
            String hash = getMD5(buf);
            baos.close();
            Log.d("RNImagePicker","结束读取Md5输入流");
            File tempFile = createTempFile(hash);
            if (!tempFile.exists()) {
                if (!tempFile.createNewFile())
                    return null;
                tempFile.deleteOnExit();
                OutputStream os = new FileOutputStream(tempFile);
                //baos.writeTo(os);
                Log.d("RNImagePicker","开始bitmap.compress");
                //bitmap.compress(Bitmap.CompressFormat.PNG, 100, os);
                os.write(buf);
                os.flush();
                os.close();
                Log.d("RNImagePicker","结束bitmap.compress");
            }

            String fileuri = Uri.fromFile(tempFile).toString();
            result = new WritableNativeMap();
            result.putString("uri", fileuri);
            result.putString("md5", hash);
            result.putString("type", "image/jpeg");
        }
        catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        return result;
    }

    public static boolean cropImage(Activity activity, Uri uri, int width, int height) {
        try {
            Intent intent = new Intent("com.android.camera.action.CROP");
            intent.setDataAndType(uri, "image/*");
            intent.putExtra("output", uri);
            intent.putExtra("crop", "true");
            intent.putExtra("aspectX", width);
            intent.putExtra("aspectY", height);
            intent.putExtra("outputX", width);
            intent.putExtra("outputY", height);
            /*
            if (width == height) {
                intent.putExtra("scale", false);
            }
            */
            intent.putExtra("scale", true);
            intent.putExtra("scaleUpIfNeeded", true);
            intent.putExtra("circleCrop", false);
            intent.putExtra("noFaceDetection", true);
            intent.putExtra("return-data", false);
            //intent.putExtra("outputFormat", Bitmap.CompressFormat.PNG.toString());
            intent.putExtra("outputFormat", Bitmap.CompressFormat.JPEG.toString());
            activity.startActivityForResult(intent, CROP_IMAGE_REQUEST);
        }
        catch (ActivityNotFoundException e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    public static void onPickResult(Activity activity, int resultCode, Intent data) {
        if (g_currentPick != null) {
            if ((resultCode != Activity.RESULT_OK) || (data == null)) {
                g_currentPick.mPromise.resolve(null);
                g_currentPick = null;
            }
            else {
                Uri mImageCaptureUri = data.getData();
                Bitmap image = null;
                if (mImageCaptureUri != null) {
                    try {
                        image = MediaStore.Images.Media.getBitmap(activity.getContentResolver(), mImageCaptureUri);
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                } else {
                    Bundle extras = data.getExtras();
                    if (extras != null) {
                        image = extras.getParcelable("data");
                    }
                }

                WritableMap result = null;
                if (image != null) {
                    int width = 0;
                    int height = 0;
                    if (g_currentPick.mOptions != null) {
                        width = g_currentPick.mOptions.getInt("width");
                        height = g_currentPick.mOptions.getInt("height");
                    }

                    boolean needcrop = ((width < image.getWidth()) || (height < image.getHeight()));
                    if ((width > 0) && (height > 0) && needcrop) {
                        Uri uri = null;
                        File file = saveImageToTemp(image);
                        if (file != null) {
                            uri = Uri.fromFile(file);
                        }

                        if ((uri != null) && cropImage(activity, uri, width, height)) {
                            g_currentPick.mCropFileUri = uri;
                        }
                        else {
                            Matrix matrix = new Matrix();
                            float srcwidth = image.getWidth();
                            float srcheight = image.getHeight();
                            float dstwidth = (float)width;
                            float dstheight = (float)height;
                            matrix.postScale(dstwidth / srcwidth, dstheight / srcheight);
                            Bitmap resizeBmp = Bitmap.createBitmap(image,0,0,image.getWidth(),image.getHeight(),matrix,true);
                            result = savePicToTemp(resizeBmp);

                            if (result != null) {
                                g_currentPick.mPromise.resolve(result);
                            }
                            else {
                                g_currentPick.mPromise.resolve(null);
                            }
                            g_currentPick = null;
                        }
                    }
                    else {
                        result = savePicToTemp(image);
                        if (result != null) {
                            g_currentPick.mPromise.resolve(result);
                        }
                        else {
                            g_currentPick.mPromise.resolve(null);
                        }
                        g_currentPick = null;
                    }
                }
                else {
                    g_currentPick.mPromise.resolve(null);
                    g_currentPick = null;
                }
            }
        }
    }

    public static void onCropResult(Activity activity, int resultCode, Intent data) {
        if (g_currentPick != null) {
            if ((resultCode != Activity.RESULT_OK) || (data == null)) {
                g_currentPick.mPromise.resolve(null);
            }
            else {
                Bitmap image = null;
                try {
                    image = MediaStore.Images.Media.getBitmap(activity.getContentResolver(), g_currentPick.mCropFileUri);
                } catch (Exception e) {
                    e.printStackTrace();
                }

                WritableMap result = null;
                if (image != null) {
                    result = savePicToTemp(image);
                }

                if (result != null) {
                    g_currentPick.mPromise.resolve(result);
                }
                else {
                    g_currentPick.mPromise.resolve(null);
                }
            }
            g_currentPick = null;
        }
    }

    public RNImagePicker(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "RNImagePicker";
    }

    @ReactMethod
    public void pickImage(final ReadableMap options, Promise promise) {
        PickImage runnable = new PickImage(options, promise);
        g_messageHandler.post(runnable);
    }
}
