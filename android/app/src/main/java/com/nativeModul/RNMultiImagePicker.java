/*
 * Copyright (C) 2016 BangTu. All rights reserved.
 */
package com.nativeModul;

import android.Manifest;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.media.ExifInterface;
import android.media.ThumbnailUtils;
import android.net.Uri;
import android.support.v4.content.ContextCompat;
import android.text.TextUtils;
import android.util.Log;


import com.chat_app.ImitationReactActivity;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.UiThreadUtil;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.nativeModul.MultiImageSlector.MultiImageSelector;
import com.nativeModul.MultiImageSlector.MultiImageSelectorActivity;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.lang.reflect.Field;
import java.security.MessageDigest;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * Created by tomnotcat on 10/26/16.
 */
public class RNMultiImagePicker extends ReactContextBaseJavaModule {
    public static Promise multiImagePickerPromise;
    static ReactApplicationContext context;
    private static final char HEX_DIGITS[] = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
            'a', 'b', 'c', 'd', 'e', 'f' };
    public RNMultiImagePicker(ReactApplicationContext reactContext) {
        super(reactContext);

        context = reactContext;
    }

    private  static int bitmapMaxWidth = 0;
    private static int bitmapMaxHeight = 0;

    @Override
    public String getName() {
        return "RNMultiImagePicker";
    }

    @ReactMethod
    public void pickImage(final ReadableMap options, final Promise promise) {
        RNMultiImagePicker.multiImagePickerPromise = promise;
        UiThreadUtil.runOnUiThread(new Runnable() {
            private boolean hasStoragePermission(Context context) {
                if (true/*Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN*/) {
                    // Permission was added in API Level 16
                    return (ContextCompat.checkSelfPermission(context, Manifest.permission.READ_EXTERNAL_STORAGE)
                            == PackageManager.PERMISSION_GRANTED) &&
                            (ContextCompat.checkSelfPermission(context, Manifest.permission.WRITE_EXTERNAL_STORAGE)
                                    == PackageManager.PERMISSION_GRANTED);
                }
                return true;
            }

            private boolean hasCameraPermission(Context context) {
                if (true/*Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN*/) {
                    // Permission was added in API Level 16
                    return ContextCompat.checkSelfPermission(context, Manifest.permission.CAMERA)
                            == PackageManager.PERMISSION_GRANTED;
                }
                return true;
            }

            @Override
            public void run() {
                Activity activity =getCurrentActivity(); //RNActivity.currentActivity();
                if (activity != null && MultiImageSelector.hasPermission(activity) && hasStoragePermission(activity) && hasCameraPermission(activity)) {
                    int count = options.getInt("count");

                    bitmapMaxWidth = options.hasKey("width") ? options.getInt("width") : 0;
                    bitmapMaxHeight = options.hasKey("height") ? options.getInt("height") : 0;
                    MultiImageSelector multiImageSelector = MultiImageSelector.create();
                    multiImageSelector.multi();
                    multiImageSelector.count(count);
                    multiImageSelector.start(activity, ImitationReactActivity.BT_MULTII_IMAGE_PICKER);
                } else {
                    multiImagePickerPromise.resolve(null);
                    multiImagePickerPromise = null;
                }
            }
        });
    }
    public static void saveExif(String oldFilePath, String newFilePath) {
        try {
            ExifInterface oldExif = new ExifInterface(oldFilePath);
            ExifInterface newExif = new ExifInterface(newFilePath);
            Class<ExifInterface> cls = ExifInterface.class;
            Field[] fields = cls.getFields();
            boolean hasexif = false;
            for (int i = 0; i < fields.length; i++) {
                String fieldName = fields[i].getName();
                if (!TextUtils.isEmpty(fieldName) && fieldName.startsWith("TAG")) {
                    String fieldValue = fields[i].get(cls).toString();
                    String attribute = oldExif.getAttribute(fieldValue);
                    if (attribute != null) {
                        newExif.setAttribute(fieldValue, attribute);
                        hasexif = true;
                    }
                }
            }

            if (hasexif) {
                newExif.saveAttributes();
            }
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void onMultiPickerResult(Activity activity, int requestCode, int resultCode, Intent data){
        if(multiImagePickerPromise == null){
            return;
        }
        if(resultCode != MultiImageSelectorActivity.RESULT_OK){
            multiImagePickerPromise.resolve(null);
            multiImagePickerPromise = null;
            return;
        }
        List<String> imagePaths = data.getStringArrayListExtra(MultiImageSelectorActivity.EXTRA_RESULT);
        if(imagePaths == null||imagePaths.size() == 0){
            multiImagePickerPromise.resolve(null);
            multiImagePickerPromise = null;
            return;
        }


        WritableArray result = new WritableNativeArray();
        for(int i = 0;i<imagePaths.size();i++) {
            WritableMap imageMap = new WritableNativeMap();
            String bitmapaddr = imagePaths.get(i);
            File file = new File(bitmapaddr);
            String imageMd5=null;
            String path = null;
            if(bitmapMaxWidth != 0&&bitmapMaxHeight!=0){
                BitmapFactory.Options options = new BitmapFactory.Options();
                options.inJustDecodeBounds = true;
                BitmapFactory.decodeFile(bitmapaddr,options);
                float widPer = ((float)options.outWidth)/bitmapMaxWidth;
                float heiPer = ((float)options.outHeight)/bitmapMaxHeight;
                float per = Math.max(widPer,heiPer);
                if(per>1){//未超过最大值限制不作处理。
                    options.inJustDecodeBounds = false;
                    try{
                        //源文件的MD5信息。
                        long lastModf = file.lastModified();
                        long fileLength = file.length();
                        String beforeMD5 = bitmapaddr+lastModf+fileLength+bitmapMaxWidth+bitmapMaxHeight;
                        MessageDigest msgMd5 = MessageDigest.getInstance("MD5");
                        byte[] md5FileInput = beforeMD5.getBytes();
                        msgMd5.update(md5FileInput, 0, md5FileInput.length);
                        String localMD5 = toHexString(msgMd5.digest());

                        //创建临时文件
                        File tempFile = createTempFile(localMD5);
                        if (!tempFile.exists()){
                            if (!tempFile.createNewFile())
                            {
                                continue;
                            }
                            Log.d("RNMultiImagePicker", "");
                            Bitmap bitmap = BitmapFactory.decodeFile(bitmapaddr,options);

                            //压缩图像到固定值。
                            Bitmap tempBitmap = ThumbnailUtils.extractThumbnail(bitmap, (int)(bitmap.getWidth()/per),
                                    (int)(bitmap.getHeight()/per),ThumbnailUtils.OPTIONS_RECYCLE_INPUT);
                            bitmap.recycle();

                            tempFile.deleteOnExit();
                            FileOutputStream os = new FileOutputStream(tempFile);
                            tempBitmap.compress(Bitmap.CompressFormat.JPEG, 100, os);
                            os.flush();
                            os.close();
                            tempBitmap.recycle();

                            // Save exif
                            saveExif(bitmapaddr, tempFile.getAbsolutePath());
                        }
                        path = Uri.fromFile(tempFile).toString();
                        imageMd5 = getFileMd5(tempFile);
                    }
                    catch (Exception ioe){
                        ioe.printStackTrace();
                        continue;
                    }
                    catch (OutOfMemoryError ex) {
                        ex.printStackTrace();
                        continue;
                    }
                }
                else{
                    imageMd5 = getFileMd5(file);
                    path = Uri.fromFile(file).toString();
                }
            }
            else{
                imageMd5 = getFileMd5(file);
                path = Uri.fromFile(file).toString();
            }

            imageMap.putString("uri", path);
            imageMap.putString("md5", imageMd5);
            imageMap.putString("type", "image/jpeg");
            result.pushMap(imageMap);
        }
        if(result.size()==0){
            multiImagePickerPromise.resolve(null);
            multiImagePickerPromise = null;
            return;
        }
        multiImagePickerPromise.resolve(result);
        multiImagePickerPromise = null;
    }

    public static File createTempFile(String hash) {
        String tmpDir = context.getCacheDir().getAbsolutePath();
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

    public static String getPhotoFileName() {
        Date date = new Date(System.currentTimeMillis());
        SimpleDateFormat dateFormat = new SimpleDateFormat("'IMG'_yyyyMMdd_HHmmss");
        return dateFormat.format(date) + ".png";
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
    private static String  getMd5(File file){
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
    public static String toHexString(byte[] b) {
        StringBuilder sb = new StringBuilder(b.length * 2);
        for (int i = 0; i < b.length; i++) {
            sb.append(HEX_DIGITS[(b[i] & 0xf0) >>> 4]);
            sb.append(HEX_DIGITS[b[i] & 0x0f]);
        }
        return sb.toString();
    }




}