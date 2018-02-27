/**
 * Sample React Native App  //I want do more things
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ToastAndroid
    } from 'react-native';
var config=require('../config');

 class StoreManger{
    constructor(socketObj:Object){
       // ToastAndroid.show(socketObj+"����",ToastAndroid.LONG);
       this.socket=socketObj.socket;
    }
    messageLogin(uname,userid){
        this.socket.emit('login',uname);
        this.socket.on('system',(msg)=>{
            ToastAndroid.show(msg.newUser+"����",ToastAndroid.LONG);
        });
    }
    getSysterMessage(){//�õ�ϵͳ��Ϣ

    }
}
module.exports=StoreManger;

