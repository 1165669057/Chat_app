/**
 * Created by Administrator on 2017/7/21.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    NativeModules,
    ToastAndroid,
    View,
    Platform
    } from 'react-native';
var NativeUtil=new Object();
NativeUtil.PERMISSION_LOCATION = "android.permission.ACCESS_FINE_LOCATION";
NativeUtil.PERMISSION_CAMERA = "android.permission.CAMERA";
NativeUtil.PERMISSION_READ_STORAGE = "android.permission.READ_EXTERNAL_STORAGE";
NativeUtil.PERMISSION_WRITE_STORAGE = "android.permission.WRITE_EXTERNAL_STORAGE";
const is_android = (Platform.OS === 'android');
function dummyPresentCb(resultCode, args) {
}
//进入Activity
NativeUtil.enter=function(text,value,callback){
    NativeModules.UtilEnter.enter(text,value);
}

//结束Activity
NativeUtil.overFinish=function(text,value,callback){
    NativeModules.UtilEnter.overFinish(text,value);
}

//检测权限
NativeUtil.requestPermissions = function (permissions, cb) {
    if (!cb) {
        cb = dummyPresentCb;
    }
    if (is_android) {
        NativeModules.UtilEnter.requestPermissions(permissions, cb);
    }
    else {
        cb(permissions, null);
    }
}

//分享
NativeUtil.share=function(type,title,text,url,cb){
    if(!cb){
        cb = dummyPresentCb;
    }
    if(!url){
        url="";
    }
    if(!title){
        ToastAndroid.show("参数错误：请传入分享标题",ToastAndroid.LONG);
        return;
    }
    if(!text){
        ToastAndroid.show("参数错误：请传入分享内容",ToastAndroid.LONG);
        return;
    }
    if(!type){
        ToastAndroid.show("参数错误：请传入分享类型",ToastAndroid.LONG);
        return;
    }
    NativeModules.RNShare.shareStart(type,title,text,url,cb);
}
module.exports=NativeUtil;