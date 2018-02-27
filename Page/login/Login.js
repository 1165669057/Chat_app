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
    TextInput,
    ToastAndroid,
    ActivityIndicator
    } from 'react-native';
import {
    Color,
    FontSize,
    Action,
    AddressList,
    Button,
    CarouselPage,
    TobBar,
    ModalDialog
    } from '../../UIlib';
import{
    NativeUtil
    }from "../../NativeModule"

import{
    storeManger
    }from '../SingleStoreSocket';

import {
    GuidePage,
    Main,
    Home,
    }from '../index.js';

export default class React_native extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uname:"",
            pwd:"",
            animating:true,
            modalVisible:false,
        }
    }
    componentWillReceiveProps() {

    }
    componentWillMount() {
    }
    componentDidMount() {
    }
    componentWillUnmount() {//

    }
    loginFetch(obj){
        this.refs["Modal"].setModalVisible(true);
        var url='http://172.16.20.253:8085/doLogin';
        var formData = new FormData();
        formData.append("uname",this.state.uname);
        formData.append("upwd",this.state.pwd);
             fetch(url,{
                 method: 'POST',
                 body: formData,})
            .then((response)=>response.json())
            .then((responseText)=>{
                  this.refs["Modal"].setModalVisible(false);
                  storeManger.messageLogin(responseText.data.uname,responseText.data.id);
                  Action.replacePush(obj,Home,{result:JSON.stringify(responseText),storeManger:storeManger});
            }).catch((error)=>{
                 ToastAndroid.show(error+"--",ToastAndroid.LONG);
            });
    }

    backImage(){
    }

    loading(){
        return (
            <View >
               <Text>正在加载中.....</Text>
            </View>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <TobBar
                    bgcolor={"#03A9F4"}
                    middletext={"登入"}
                    backImage={this.backImage.bind(this)}
                    />
                <View style={[styles._centerv,{marginTop:20,}]}>
                    <Text style={{fontSize:FontSize.font_main}}>用户名:</Text>
                    <View style={styles._inputview}>
                        <TextInput
                            style={{fontSize:FontSize.font_main}}
                            onChangeText={(text)=>{
                         this.setState({
                           uname:text
                        });
                    }}
                            underlineColorAndroid="transparent"
                            value={this.state.uname}
                            />
                    </View>
                </View>
                <View style={styles.line} />
                <View style={styles._centerv}>
                    <Text style={{fontSize:FontSize.font_main}}>密{"  "}码:</Text>
                    <View style={styles._inputview}>
                        <TextInput
                            style={{fontSize:FontSize.font_main}}
                            secureTextEntry={true}
                            onChangeText={(text)=>{
                        this.setState({
                           pwd:text
                        })
                    }}
                            underlineColorAndroid="transparent"
                            value={this.state.pwd}
                            />
                    </View>
                </View>
                <Button
                    textStyle={{color:"#ffffff",fontSize:FontSize.font_main}}
                    style={styles.sty}
                    isWithOutLine={false}
                    onPress={()=>{
                          this.loginFetch(this);
                     }}
                    children={"login"}
                    />
                <ModalDialog
                    ref="Modal"
                    background={"#0000004f"}
                    childView={this.loading()}
                    chooseFinish={(stu)=>{
                    }}
                    modalVisible={this.state.modalVisible}
                    />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
    line:{
        height:0.5,
        backgroundColor:"#cccccc",
        marginLeft:10,
    },
    sty:{
        marginLeft:20,
        marginRight:20,
        marginTop:20,
        height:40,
        borderRadius:2,
        justifyContent:'center',
        backgroundColor:"#03A9F4"//Color.c_main
    },
    _inputview:{
        flex:1,
    },
    _centerv:{
        height:40,
        flexDirection:'row',
        alignItems: 'center',
        paddingLeft:10,
        paddingRight:10,
        backgroundColor:"#ffffff"
    },
    container: {
        flex: 1,
        // justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

module.exports=React_native;