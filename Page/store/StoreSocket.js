/**
 * Sample React Native App  //I want do more things
 * https://github.com/facebook/react-native
 * @flow
 */
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ToastAndroid
    } from 'react-native';

var IO=require('socket.io-client');
import config from '../config';
export default class StoreSocket{
    constructor(){
        this.socket = IO(config.server, { //
            transports: ['websocket']
        });
        //连接成功
        this.socket.on('connect', () => {
            ToastAndroid.show("连接成功",ToastAndroid.LONG);
        });
    }
}



